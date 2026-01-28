// Task Management API Route
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

// Types
interface Subtask {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    documentation: string;
    documentedAt?: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdByName: string;
    assignedTo: string;
    assignedToName: string;
    status: "pending" | "in-progress" | "completed";
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    subtasks: Subtask[];
}

// Helper to generate unique IDs
function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// POST - Create a new task (Supervisor only)
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        // Only supervisors can create tasks
        if (payload.role !== "supervisor") {
            return NextResponse.json(
                { error: "Only supervisors can create tasks" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { title, description, assignedTo, dueDate, subtasks } = body;

        // Validate required fields
        if (!title || !assignedTo || !subtasks || !Array.isArray(subtasks)) {
            return NextResponse.json(
                { error: "Title, assignedTo, and subtasks are required" },
                { status: 400 }
            );
        }

        // Get supervisor's name
        const usersRef = adminDb.collection("users");
        const supervisorDoc = await usersRef.doc(payload.userId).get();
        const supervisorData = supervisorDoc.data();

        // Get student's name
        const studentDoc = await usersRef.doc(assignedTo).get();
        if (!studentDoc.exists) {
            return NextResponse.json(
                { error: "Assigned student not found" },
                { status: 404 }
            );
        }
        const studentData = studentDoc.data();

        // Create subtasks with IDs
        const formattedSubtasks: Subtask[] = subtasks.map((st: { title: string; description?: string }) => ({
            id: generateId(),
            title: st.title,
            description: st.description || "",
            status: "pending" as const,
            documentation: "",
        }));

        // Create task document
        const taskDoc: Omit<Task, "id"> = {
            title,
            description: description || "",
            createdBy: payload.userId,
            createdByName: supervisorData?.name || "Unknown Supervisor",
            assignedTo,
            assignedToName: studentData?.name || "Unknown Student",
            status: "pending",
            dueDate: dueDate || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            subtasks: formattedSubtasks,
        };

        const tasksRef = adminDb.collection("tasks");
        const newTaskRef = await tasksRef.add(taskDoc);

        return NextResponse.json(
            {
                message: "Task created successfully",
                task: { id: newTaskRef.id, ...taskDoc }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create task error:", error);
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}

// GET - Fetch tasks based on user role and optional filters
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get("studentId");

        const tasksRef = adminDb.collection("tasks");
        let query;

        if (payload.role === "supervisor") {
            // Supervisors can fetch tasks they created
            // If studentId is provided, filter by that student
            if (studentId) {
                query = tasksRef
                    .where("createdBy", "==", payload.userId)
                    .where("assignedTo", "==", studentId);
            } else {
                query = tasksRef.where("createdBy", "==", payload.userId);
            }
        } else if (payload.role === "student") {
            // Students can only fetch tasks assigned to them
            query = tasksRef.where("assignedTo", "==", payload.userId);
        } else {
            return NextResponse.json(
                { error: "Invalid role" },
                { status: 403 }
            );
        }

        // Get tasks without orderBy to avoid requiring a composite index
        const snapshot = await query.get();
        const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Array<{ id: string; createdAt: string } & Record<string, unknown>>;

        // Sort by createdAt client-side (newest first)
        tasks.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error("Fetch tasks error:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

// PATCH - Update task or subtask (documentation, status)
export async function PATCH(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { taskId, subtaskId, documentation, status } = body;

        if (!taskId) {
            return NextResponse.json(
                { error: "Task ID is required" },
                { status: 400 }
            );
        }

        const tasksRef = adminDb.collection("tasks");
        const taskDoc = await tasksRef.doc(taskId).get();

        if (!taskDoc.exists) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        const taskData = taskDoc.data() as Task;

        // Verify user has permission to update
        if (payload.role === "student" && taskData.assignedTo !== payload.userId) {
            return NextResponse.json(
                { error: "You can only update tasks assigned to you" },
                { status: 403 }
            );
        }

        if (payload.role === "supervisor" && taskData.createdBy !== payload.userId) {
            return NextResponse.json(
                { error: "You can only update tasks you created" },
                { status: 403 }
            );
        }

        const updates: Partial<Task> = {
            updatedAt: new Date().toISOString(),
        };

        // Update subtask if subtaskId is provided
        if (subtaskId) {
            const subtaskIndex = taskData.subtasks.findIndex(st => st.id === subtaskId);
            if (subtaskIndex === -1) {
                return NextResponse.json(
                    { error: "Subtask not found" },
                    { status: 404 }
                );
            }

            const updatedSubtasks = [...taskData.subtasks];

            if (documentation !== undefined) {
                updatedSubtasks[subtaskIndex].documentation = documentation;
                updatedSubtasks[subtaskIndex].documentedAt = new Date().toISOString();
            }

            if (status) {
                updatedSubtasks[subtaskIndex].status = status;
            }

            updates.subtasks = updatedSubtasks;

            // Auto-update task status based on subtasks
            const allCompleted = updatedSubtasks.every(st => st.status === "completed");
            const someInProgress = updatedSubtasks.some(st => st.status === "in-progress" || st.status === "completed");

            if (allCompleted) {
                updates.status = "completed";
            } else if (someInProgress) {
                updates.status = "in-progress";
            }
        } else {
            // Update task-level status
            if (status) {
                updates.status = status;
            }
        }

        await tasksRef.doc(taskId).update(updates);

        // Fetch updated task
        const updatedTaskDoc = await tasksRef.doc(taskId).get();

        return NextResponse.json(
            {
                message: "Task updated successfully",
                task: { id: taskId, ...updatedTaskDoc.data() }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update task error:", error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}
