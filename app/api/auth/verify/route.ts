// Verify Token API Route
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json(
                { error: "No token provided" },
                { status: 401 }
            );
        }

        // Verify token
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        // Get fresh user data from Firestore
        const userDoc = await adminDb.collection("users").doc(payload.userId).get();

        if (!userDoc.exists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();

        return NextResponse.json(
            {
                valid: true,
                user: {
                    id: userDoc.id,
                    email: userData?.email,
                    name: userData?.name,
                    role: userData?.role,
                    uniqueId: userData?.uniqueId,
                    profileImage: userData?.profileImage,
                    connections: userData?.connections || [],
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verify error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
