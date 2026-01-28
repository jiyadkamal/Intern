// User Connection API Route
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

// POST - Create connection request
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

        const body = await request.json();
        const { targetUniqueId } = body;

        if (!targetUniqueId) {
            return NextResponse.json(
                { error: "Target unique ID is required" },
                { status: 400 }
            );
        }

        // Find target user by unique ID
        const usersRef = adminDb.collection("users");
        const targetSnapshot = await usersRef.where("uniqueId", "==", targetUniqueId).get();

        if (targetSnapshot.empty) {
            return NextResponse.json(
                { error: "User with this ID not found" },
                { status: 404 }
            );
        }

        const targetUser = targetSnapshot.docs[0];
        const targetData = targetUser.data();

        // Prevent self-connection
        if (targetUser.id === payload.userId) {
            return NextResponse.json(
                { error: "Cannot connect to yourself" },
                { status: 400 }
            );
        }

        // Check existing connection
        const connectionsRef = adminDb.collection("connections");
        const existingConnection = await connectionsRef
            .where("requesterId", "==", payload.userId)
            .where("targetId", "==", targetUser.id)
            .get();

        if (!existingConnection.empty) {
            return NextResponse.json(
                { error: "Connection request already exists" },
                { status: 409 }
            );
        }

        // Get requester's data to store their name
        const requesterDoc = await usersRef.doc(payload.userId).get();
        const requesterData = requesterDoc.data();

        // Create connection request
        const connectionDoc = {
            requesterId: payload.userId,
            requesterName: requesterData?.name || "Unknown User",
            requesterEmail: payload.email,
            requesterRole: payload.role,
            targetId: targetUser.id,
            targetName: targetData.name || "Unknown User",
            targetEmail: targetData.email,
            targetRole: targetData.role,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        const docRef = await connectionsRef.add(connectionDoc);

        return NextResponse.json(
            {
                message: "Connection request sent",
                connectionId: docRef.id,
                targetUser: {
                    name: targetData.name,
                    role: targetData.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Connection error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET - Get user's connections
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

        const connectionsRef = adminDb.collection("connections");

        // Get incoming connection requests
        const incomingSnapshot = await connectionsRef
            .where("targetId", "==", payload.userId)
            .get();

        // Get outgoing connection requests
        const outgoingSnapshot = await connectionsRef
            .where("requesterId", "==", payload.userId)
            .get();

        const incoming = incomingSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            direction: "incoming",
        }));

        const outgoing = outgoingSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            direction: "outgoing",
        }));

        return NextResponse.json(
            {
                connections: [...incoming, ...outgoing],
                incoming,
                outgoing,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get connections error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PATCH - Accept or reject connection
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
        const { connectionId, action } = body;

        if (!connectionId || !action) {
            return NextResponse.json(
                { error: "Connection ID and action are required" },
                { status: 400 }
            );
        }

        if (!["accept", "reject"].includes(action)) {
            return NextResponse.json(
                { error: "Invalid action. Must be: accept or reject" },
                { status: 400 }
            );
        }

        const connectionRef = adminDb.collection("connections").doc(connectionId);
        const connectionDoc = await connectionRef.get();

        if (!connectionDoc.exists) {
            return NextResponse.json(
                { error: "Connection not found" },
                { status: 404 }
            );
        }

        const connectionData = connectionDoc.data();

        // Only target can accept/reject
        if (connectionData?.targetId !== payload.userId) {
            return NextResponse.json(
                { error: "Not authorized to modify this connection" },
                { status: 403 }
            );
        }

        // Update connection status
        await connectionRef.update({
            status: action === "accept" ? "accepted" : "rejected",
            updatedAt: new Date().toISOString(),
        });

        // If accepted, add to both users' connections array
        if (action === "accept") {
            const usersRef = adminDb.collection("users");

            await usersRef.doc(connectionData.requesterId).update({
                connections: FieldValue.arrayUnion(connectionData.targetId),
            });

            await usersRef.doc(connectionData.targetId).update({
                connections: FieldValue.arrayUnion(connectionData.requesterId),
            });
        }

        return NextResponse.json(
            {
                message: `Connection ${action}ed successfully`,
                status: action === "accept" ? "accepted" : "rejected",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update connection error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
