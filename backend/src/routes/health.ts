import { FastifyInstance } from "fastify";

export async function healthRoutes(fastify: FastifyInstance) {
    fastify.get("/health", async () => {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            service: "ACCP 2026 Backend API",
            version: "1.0.0",
        };
    });

    fastify.get("/", async () => {
        return {
            name: "ACCP 2026 Conference API",
            description: "Backend API for the 25th Asian Conference on Clinical Pharmacy",
            theme: "Borderless Pharmacy Practice: The Collaboration for sustainability and Cultural Integration",
            conference: {
                dates: "July 10-11, 2026",
                workshop: "July 9, 2026",
                venue: "Centara Grand & Bangkok Convention Centre at CentralWorld",
                city: "Bangkok, Thailand",
            },
            endpoints: {
                health: "/health",
                auth: "/api/auth",
                abstracts: "/api/abstracts",
                registrations: "/api/registrations",
            },
        };
    });
}
