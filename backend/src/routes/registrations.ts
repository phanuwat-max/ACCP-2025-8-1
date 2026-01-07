import { FastifyInstance } from "fastify";
import { z } from "zod";

const registrationSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    affiliation: z.string().min(1),
    country: z.string().min(1),
    delegateType: z.enum(["all_delegate", "pharmacy_students"]),
    category: z.enum(["full_registration", "day_registration", "workshops"]),
    includesWorkshop: z.boolean().default(false),
    workshopTopics: z.array(z.string()).optional(),
    includesGalaDinner: z.boolean().default(false),
    dietaryRequirements: z.string().optional(),
    specialNeeds: z.string().optional(),
});

// Generate registration number
function generateRegistrationNumber(): string {
    const year = "26";
    const random = Math.random().toString().substring(2, 8);
    return `REG${year}${random}`;
}

// Calculate registration fee
function calculateFee(
    delegateType: string,
    category: string,
    includesWorkshop: boolean,
    workshopCount: number,
    includesGalaDinner: boolean,
    isEarlyBird: boolean,
    isInternational: boolean
): { amount: number; currency: string } {
    let amount = 0;
    const currency = isInternational ? "USD" : "THB";

    // Base registration fees
    if (isInternational) {
        if (delegateType === "pharmacy_students") {
            amount = isEarlyBird ? 250 : 270;
        } else {
            amount = isEarlyBird ? 385 : 400;
        }

        if (includesWorkshop) amount += 70 * workshopCount;
        if (includesGalaDinner) amount += 75;
    } else {
        // Thai pricing
        if (delegateType === "pharmacy_students") {
            amount = 4900; // Same for early bird and regular
        } else {
            amount = isEarlyBird ? 7900 : 8900;
        }

        if (includesWorkshop) amount += 2100 * workshopCount;
        if (includesGalaDinner) amount += 2200;
    }

    return { amount, currency };
}

export async function registrationRoutes(fastify: FastifyInstance) {
    // Get registration fees
    fastify.get("/fees", async () => {
        return {
            earlyBird: {
                startDate: "2026-01-15",
                endDate: "2026-04-15",
            },
            regular: {
                startDate: "2026-04-16",
                endDate: "2026-07-09",
            },
            international: {
                student: { earlyBird: 250, regular: 270, currency: "USD" },
                professional: { earlyBird: 385, regular: 400, currency: "USD" },
                workshop: { price: 70, currency: "USD" },
                galaDinner: { price: 75, currency: "USD" },
            },
            thai: {
                student: { earlyBird: 4900, regular: 4900, currency: "THB" },
                professional: { earlyBird: 7900, regular: 8900, currency: "THB" },
                workshop: { price: 2100, currency: "THB" },
                galaDinner: { price: 2200, currency: "THB" },
            },
        };
    });

    // Register for conference
    fastify.post("/register", async (request, reply) => {
        try {
            const body = registrationSchema.parse(request.body);
            const registrationNumber = generateRegistrationNumber();

            // Determine if international (simplified - check if country is not Thailand)
            const isInternational = body.country.toLowerCase() !== "thailand";
            const isEarlyBird = new Date() < new Date("2026-04-16");
            const workshopCount = body.workshopTopics?.length || 0;

            const fee = calculateFee(
                body.delegateType,
                body.category,
                body.includesWorkshop,
                workshopCount,
                body.includesGalaDinner,
                isEarlyBird,
                isInternational
            );

            // TODO: Save to database
            return {
                success: true,
                registrationNumber,
                registration: {
                    ...body,
                    registrationNumber,
                    status: "pending",
                    totalAmount: fee.amount,
                    currency: fee.currency,
                    isEarlyBird,
                    createdAt: new Date().toISOString(),
                },
                payment: {
                    amount: fee.amount,
                    currency: fee.currency,
                    message: "Please proceed to payment to confirm your registration.",
                },
            };
        } catch (error) {
            if (error instanceof z.ZodError) {
                reply.status(400).send({ error: "Validation failed", details: error.errors });
            } else {
                reply.status(500).send({ error: "Registration failed" });
            }
        }
    });

    // Get registration by number
    fastify.get("/:registrationNumber", async (request, reply) => {
        const { registrationNumber } = request.params as { registrationNumber: string };

        // TODO: Fetch from database
        return {
            registrationNumber,
            status: "pending",
            message: "Registration lookup endpoint",
        };
    });

    // Get registration deadlines
    fastify.get("/deadlines", async () => {
        return {
            registrationOpen: "2026-01-15",
            registrationClose: "2026-07-09",
            workshopDate: "2026-07-09",
            conferenceDates: "2026-07-10 - 2026-07-11",
        };
    });
}
