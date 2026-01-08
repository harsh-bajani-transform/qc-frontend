import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { signInSchema } from "../validations";
import { DEVICE_ID, DEVICE_TYPE } from "../constants";
import { getPythonBackendUrl } from "@/lib/env";
import { setSession } from "../lib/session";
import type { LoginResponse } from "../types";

export const userRouter = createTRPCRouter({
    getOne: baseProcedure.input(signInSchema).query(async ()=>{}),
    getMany: baseProcedure.input(signInSchema).query(async ()=>{}),
    signIn: baseProcedure.input(signInSchema).mutation(async ({ input }) => {
        try {
            const pythonBackendUrl = getPythonBackendUrl();

            // Ensure device constants are defined
            if (!DEVICE_ID || !DEVICE_TYPE) {
                throw new Error("Device constants are not properly configured");
            }

            const requestBody = {
                user_email: input.email,
                user_password: input.password,
                device_id: DEVICE_ID,
                device_type: DEVICE_TYPE,
            };

            const url = `${pythonBackendUrl}/auth/user`;
            console.log("Sending login request to:", url);
            console.log("Request body:", JSON.stringify(requestBody, null, 2));

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            console.log("Response status:", response.status);
            console.log("Response statusText:", response.statusText);
            console.log("Response headers:", Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                let errorMessage = `Login failed with status ${response.status}`;
                try {
                    const errorData = await response.json();
                    console.log("Error response data:", errorData);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    const text = await response.text().catch(() => "");
                    console.log("Error response text:", text);
                    if (text) {
                        errorMessage = `${errorMessage}: ${text}`;
                    }
                }
                throw new Error(errorMessage);
            }

            const data: LoginResponse = await response.json();
            
            // Store session data if login is successful
            if (data.status === 200 && data.data) {
                await setSession(data.data);
            }
            
            return data;
        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("An unexpected error occurred during login");
        }
    }),
    logout: baseProcedure.mutation(async () => {
        const { clearSession } = await import("../lib/session");
        await clearSession();
        return { success: true, message: "Logged out successfully" };
    }),
    getSession: baseProcedure.query(async () => {
        const { getSession } = await import("../lib/session");
        const session = await getSession();
        return session;
    }),
})