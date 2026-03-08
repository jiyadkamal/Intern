// Register API Route
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { adminDb } from "@/lib/firebase-admin";
import { generateToken, hashPassword, generateUniqueId } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, role } = body;

        // Validate required fields
        if (!email || !password || !name || !role) {
            return NextResponse.json(
                { error: "Missing required fields: email, password, name, role" },
                { status: 400 }
            );
        }

        // Validate role
        if (!["student", "supervisor"].includes(role)) {
            return NextResponse.json(
                { error: "Invalid role. Must be: student or supervisor" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const usersRef = adminDb.collection("users");
        const existingUser = await usersRef.where("email", "==", email).get();

        if (!existingUser.empty) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Generate unique ID for connections
        const uniqueId = generateUniqueId(role);

        // Create user document
        const userDoc = {
            email,
            password: hashedPassword,
            name,
            role,
            uniqueId,
            profileImage: null,
            connections: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Save to Firestore
        const docRef = await usersRef.add(userDoc);

        // Generate JWT token
        const token = generateToken({
            userId: docRef.id,
            email,
            role,
            uniqueId,
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: docRef.id,
                    email,
                    name,
                    role,
                    uniqueId,
                },
                token,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error details:", {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
