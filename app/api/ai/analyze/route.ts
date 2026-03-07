// AI Documentation Analysis API Route
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface Subtask {
    id: string;
    title: string;
    description: string;
    status: string;
    documentation: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
    createdBy: string;
    assignedTo: string;
}

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
        const taskId = searchParams.get("taskId");

        // If no taskId, return list of tasks for selection
        if (!taskId) {
            const tasksRef = adminDb.collection("tasks");
            let query;

            if (payload.role === "supervisor") {
                query = tasksRef.where("createdBy", "==", payload.userId);
            } else if (payload.role === "student") {
                query = tasksRef.where("assignedTo", "==", payload.userId);
            } else {
                return NextResponse.json(
                    { error: "Invalid role" },
                    { status: 403 }
                );
            }

            const snapshot = await query.get();
            const tasks = snapshot.docs.map(doc => {
                const data = doc.data();
                const docCount = (data.subtasks || []).filter((st: Subtask) => st.documentation?.trim()).length;
                return {
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    subtaskCount: (data.subtasks || []).length,
                    documentedCount: docCount,
                    assignedToName: data.assignedToName,
                    createdByName: data.createdByName
                };
            });

            return NextResponse.json({ tasks });
        }

        // Fetch specific task for analysis
        const taskDoc = await adminDb.collection("tasks").doc(taskId).get();

        if (!taskDoc.exists) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        const taskData = taskDoc.data() as Task;

        // Verify user has access
        if (payload.role === "supervisor" && taskData.createdBy !== payload.userId) {
            return NextResponse.json(
                { error: "Access denied" },
                { status: 403 }
            );
        }
        if (payload.role === "student" && taskData.assignedTo !== payload.userId) {
            return NextResponse.json(
                { error: "Access denied" },
                { status: 403 }
            );
        }

        // Collect all documentation for analysis from the single task
        const documentations: { taskTitle: string; subtaskTitle: string; documentation: string }[] = [];

        taskData.subtasks?.forEach(subtask => {
            if (subtask.documentation && subtask.documentation.trim()) {
                documentations.push({
                    taskTitle: taskData.title,
                    subtaskTitle: subtask.title,
                    documentation: subtask.documentation
                });
            }
        });

        if (documentations.length === 0) {
            return NextResponse.json({
                analysis: {
                    summary: "No documentation found to analyze.",
                    overallScore: 0,
                    suggestions: ["Start adding documentation to your subtasks to receive AI feedback."],
                    strengths: [],
                    improvements: [],
                    documentations: []
                }
            });
        }

        // Prepare prompt for Gemini
        const docsText = documentations.map((d, i) =>
            `Documentation ${i + 1}:\nTask: ${d.taskTitle}\nSubtask: ${d.subtaskTitle}\nContent: ${d.documentation}`
        ).join("\n\n");

        const prompt = `You are an expert internship mentor reviewing student documentation for their work tasks. Analyze the following documentation entries and provide constructive feedback.

${docsText}

Please provide a JSON response with the following structure:
{
    "summary": "A brief overall assessment (2-3 sentences)",
    "overallScore": <number from 1-100>,
    "strengths": ["List of things done well (max 5 items)"],
    "improvements": ["List of specific areas to improve (max 5 items)"],
    "detailedFeedback": [
        {
            "taskTitle": "task name",
            "subtaskTitle": "subtask name",
            "score": <number from 1-100>,
            "feedback": "Specific feedback for this documentation"
        }
    ]
}

Focus on:
- Clarity and completeness of explanations
- Technical accuracy and detail
- Learning outcomes demonstrated
- Professional writing quality
- Actionable improvements

Respond ONLY with the JSON object, no additional text.`;

        // Call Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse AI response
        let analysis;
        try {
            // Remove markdown code blocks if present
            const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
            analysis = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Failed to parse AI response:", text);
            analysis = {
                summary: "AI analysis completed but response format was unexpected.",
                overallScore: 70,
                strengths: ["Documentation is present for tasks"],
                improvements: ["Continue adding more detailed documentation"],
                detailedFeedback: []
            };
        }

        return NextResponse.json({
            analysis: {
                ...analysis,
                taskTitle: taskData.title,
                documentationCount: documentations.length
            }
        });

    } catch (error) {
        console.error("AI Analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze documentation" },
            { status: 500 }
        );
    }
}
