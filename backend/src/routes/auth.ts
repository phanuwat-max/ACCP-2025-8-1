import { FastifyInstance } from "fastify";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    affiliation: z.string().optional(),
    country: z.string().optional(),
});

export async function authRoutes(fastify: FastifyInstance) {
    // Login
    fastify.post("/login", async (request, reply) => {
        try {
            const body = loginSchema.parse(request.body);

            // TODO: Implement actual authentication with database
            // For now, return a mock token
            const token = fastify.jwt.sign({
                email: body.email,
                role: "attendee",
            });

            return { token, message: "Login successful" };
        } catch (error) {
            reply.status(400).send({ error: "Invalid credentials" });
        }
    });

    // Register
    fastify.post("/register", async (request, reply) => {
        try {
            const body = registerSchema.parse(request.body);

            // TODO: Implement actual registration with database
            return {
                message: "Registration successful",
                user: {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                },
            };
        } catch (error) {
            reply.status(400).send({ error: "Registration failed" });
        }
    });

    // Get current user (protected)
    fastify.get("/me", {
        preHandler: [(fastify as any).authenticate],
    }, async (request) => {
        return { user: (request as any).user };
    });
}
