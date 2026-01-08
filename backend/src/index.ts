import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";

import { healthRoutes } from "./routes/health.js";
import { abstractRoutes } from "./routes/abstracts.js";
import { registrationRoutes } from "./routes/registrations.js";
import { authRoutes } from "./routes/auth.js";

const fastify = Fastify({
    logger: true,
});

// Register plugins
await fastify.register(cors, {
    origin: process.env.NODE_ENV === "production"
        ? ["https://accp2026bangkok.pharmacycouncil.org"]
        : true,
    credentials: true,
});

await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "dev-secret",
});

// Authentication decorator
fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

// Register routes
await fastify.register(healthRoutes, { prefix: "/" });
await fastify.register(authRoutes, { prefix: "/api/auth" });
await fastify.register(abstractRoutes, { prefix: "/api/abstracts" });
await fastify.register(registrationRoutes, { prefix: "/api/registrations" });

// Start server
const start = async () => {
    try {
        const port = Number(process.env.PORT) || 8080;
        const host = process.env.HOST || "0.0.0.0";

        await fastify.listen({ port, host });
        console.log(`🚀 ACCP 2026 Backend running on http://${host}:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
