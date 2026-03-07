// Login API Route
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { adminDb } from "@/lib/firebase-admin";
import { generateToken, comparePassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing required fields: email, password" },
                { status: 400 }
            );
        }

        // Find user by email
        const usersRef = adminDb.collection("users");
        const userSnapshot = await usersRef.where("email", "==", email).get();

        if (userSnapshot.empty) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Get user data
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // Compare passwords
        const isValidPassword = await comparePassword(password, userData.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({
            userId: userDoc.id,
            email: userData.email,
            role: userData.role,
            uniqueId: userData.uniqueId,
        });

        // Update last login
        await usersRef.doc(userDoc.id).update({
            lastLogin: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: userDoc.id,
                    email: userData.email,
                    name: userData.name,
                    role: userData.role,
                    uniqueId: userData.uniqueId,
                    profileImage: userData.profileImage,
                },
                token,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
