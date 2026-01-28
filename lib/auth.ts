// JWT Authentication Utilities
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_change_in_production";
const JWT_EXPIRES_IN = "7d";

export interface TokenPayload {
    userId: string;
    email: string;
    role: "student" | "supervisor";
    uniqueId: string;
}

// Generate JWT token
export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
}

// Decode token without verification (for reading expired tokens)
export function decodeToken(token: string): TokenPayload | null {
    try {
        return jwt.decode(token) as TokenPayload;
    } catch (error) {
        return null;
    }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

// Compare password with hash
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Generate unique user ID (format: INT-YYYY-XXXX)
export function generateUniqueId(role: "student" | "supervisor"): string {
    const prefix = role === "student" ? "STU" : "SUP";
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${year}-${random}`;
}

// Extract token from Authorization header
export function extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7);
}
