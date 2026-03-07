// Certificate Management API Route
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

// POST - Upload a certificate (Supervisor only)
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

        // Only supervisors can upload certificates
        if (payload.role !== "supervisor") {
            return NextResponse.json(
                { error: "Only supervisors can upload certificates" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { studentId, title, fileName, fileData, fileType } = body;

        // Validate required fields
        if (!studentId || !title || !fileData || !fileName) {
            return NextResponse.json(
                { error: "Student ID, title, file name, and file data are required" },
                { status: 400 }
            );
        }

        // Verify student exists
        const studentDoc = await adminDb.collection("users").doc(studentId).get();
        if (!studentDoc.exists) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }
        const studentData = studentDoc.data();

        // Get supervisor name
        const supervisorDoc = await adminDb.collection("users").doc(payload.userId).get();
        const supervisorData = supervisorDoc.data();

        // Store certificate in Firestore
        const certificateData = {
            title,
            fileName,
            fileType: fileType || "application/pdf",
            fileData, // base64 encoded
            studentId,
            studentName: studentData?.name || "Unknown",
            studentEmail: studentData?.email || "",
            uploadedBy: payload.userId,
            uploadedByName: supervisorData?.name || "Unknown Supervisor",
            createdAt: new Date().toISOString(),
        };

        const certRef = await adminDb.collection("certificates").add(certificateData);

        return NextResponse.json(
            {
                message: "Certificate uploaded successfully",
                certificate: { id: certRef.id, title, fileName, studentName: studentData?.name, createdAt: certificateData.createdAt }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Upload certificate error:", error);
        return NextResponse.json(
            { error: "Failed to upload certificate" },
            { status: 500 }
        );
    }
}

// GET - Fetch certificates
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
        const includeFileData = searchParams.get("includeFileData") === "true";
        const certificateId = searchParams.get("id");

        // If requesting a single certificate with file data (for download)
        if (certificateId) {
            const certDoc = await adminDb.collection("certificates").doc(certificateId).get();
            if (!certDoc.exists) {
                return NextResponse.json(
                    { error: "Certificate not found" },
                    { status: 404 }
                );
            }

            const certData = certDoc.data();

            // Verify user has access
            if (payload.role === "student" && certData?.studentId !== payload.userId) {
                return NextResponse.json(
                    { error: "Access denied" },
                    { status: 403 }
                );
            }
            if (payload.role === "supervisor" && certData?.uploadedBy !== payload.userId) {
                return NextResponse.json(
                    { error: "Access denied" },
                    { status: 403 }
                );
            }

            return NextResponse.json({
                certificate: { id: certDoc.id, ...certData }
            }, { status: 200 });
        }

        // List certificates
        const certsRef = adminDb.collection("certificates");
        let query;

        if (payload.role === "supervisor") {
            query = certsRef.where("uploadedBy", "==", payload.userId);
        } else {
            query = certsRef.where("studentId", "==", payload.userId);
        }

        const snapshot = await query.get();
        const certificates = snapshot.docs.map(doc => {
            const data = doc.data();
            // Don't include file data in list view to save bandwidth
            const { fileData: _fileData, ...rest } = data;
            return {
                id: doc.id,
                ...rest,
                ...(includeFileData ? { fileData: _fileData } : {})
            };
        });

        // Sort by createdAt (newest first)
        certificates.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
            const dateA = new Date(a.createdAt as string).getTime();
            const dateB = new Date(b.createdAt as string).getTime();
            return dateB - dateA;
        });

        return NextResponse.json({ certificates }, { status: 200 });
    } catch (error) {
        console.error("Fetch certificates error:", error);
        return NextResponse.json(
            { error: "Failed to fetch certificates" },
            { status: 500 }
        );
    }
}
