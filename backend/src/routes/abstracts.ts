import { FastifyInstance } from "fastify";
import { z } from "zod";

// Topic categories matching the 8 tracks
const topicCategories = [
    "clinical_pharmacy",
    "social_administrative_pharmacy",
    "pharmacology_toxicology",
    "pharmacoeconomics_pharmacoepidemiology",
    "pharmacy_education",
    "pharmaceutics_pharmaceutical_sciences",
    "medicinal_chemistry",
    "pharmacognosy_pharmaceutical_biotechnology",
] as const;

const abstractSubmissionSchema = z.object({
    title: z.string().min(10).max(500),
    authors: z.string().min(1),
    affiliations: z.string().min(1),
    category: z.enum(topicCategories),
    abstractType: z.enum(["oral", "poster", "e_poster"]),
    keywords: z.string().optional(),
    abstractText: z.string().min(100).max(3000),
    conflictOfInterest: z.string().optional(),
});

// Generate tracking ID
function generateTrackingId(): string {
    const prefix = "ACCP26";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
}

export async function abstractRoutes(fastify: FastifyInstance) {
    // Get all topic categories
    fastify.get("/categories", async () => {
        return {
            categories: [
                { id: 1, name: "Clinical Pharmacy", slug: "clinical_pharmacy" },
                { id: 2, name: "Social and Administrative Pharmacy", slug: "social_administrative_pharmacy" },
                { id: 3, name: "Pharmacology and Toxicology", slug: "pharmacology_toxicology" },
                { id: 4, name: "Pharmacoeconomics and Pharmacoepidemiology", slug: "pharmacoeconomics_pharmacoepidemiology" },
                { id: 5, name: "Pharmacy Education", slug: "pharmacy_education" },
                { id: 6, name: "Pharmaceutics and Pharmaceutical Sciences", slug: "pharmaceutics_pharmaceutical_sciences" },
                { id: 7, name: "Medicinal Chemistry", slug: "medicinal_chemistry" },
                { id: 8, name: "Pharmacognosy and Pharmaceutical Biotechnology", slug: "pharmacognosy_pharmaceutical_biotechnology" },
            ],
        };
    });

    // Submit abstract
    fastify.post("/submit", async (request, reply) => {
        try {
            const body = abstractSubmissionSchema.parse(request.body);
            const trackingId = generateTrackingId();

            // TODO: Save to database and send confirmation email
            return {
                success: true,
                trackingId,
                message: "Abstract submitted successfully. A confirmation email will be sent shortly.",
                abstract: {
                    ...body,
                    trackingId,
                    status: "submitted",
                    submittedAt: new Date().toISOString(),
                },
            };
        } catch (error) {
            if (error instanceof z.ZodError) {
                reply.status(400).send({ error: "Validation failed", details: error.errors });
            } else {
                reply.status(500).send({ error: "Submission failed" });
            }
        }
    });

    // Get abstract by tracking ID
    fastify.get("/:trackingId", async (request, reply) => {
        const { trackingId } = request.params as { trackingId: string };

        // TODO: Fetch from database
        return {
            trackingId,
            status: "submitted",
            message: "Abstract tracking endpoint",
        };
    });

    // Get submission deadlines
    fastify.get("/deadlines", async () => {
        return {
            submissionOpen: "2026-01-15",
            submissionClose: "2026-03-15",
            notificationDate: "2026-04-15",
            isOpen: false, // Will be calculated based on current date
        };
    });
}
