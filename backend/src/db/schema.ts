import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    boolean,
    integer,
    decimal,
    pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", [
    "admin",
    "staff",
    "reviewer",
    "attendee",
]);

export const abstractStatusEnum = pgEnum("abstract_status", [
    "submitted",
    "under_review",
    "revision_requested",
    "accepted",
    "rejected",
]);

export const abstractTypeEnum = pgEnum("abstract_type", [
    "oral",
    "poster",
    "e_poster",
]);

export const registrationStatusEnum = pgEnum("registration_status", [
    "pending",
    "confirmed",
    "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
    "pending",
    "paid",
    "failed",
    "refunded",
]);

export const delegateTypeEnum = pgEnum("delegate_type", [
    "all_delegate",
    "pharmacy_students",
]);

export const registrationCategoryEnum = pgEnum("registration_category", [
    "full_registration",
    "day_registration",
    "workshops",
]);

// Abstract Topic Categories (8 tracks)
export const topicCategoryEnum = pgEnum("topic_category", [
    "clinical_pharmacy",
    "social_administrative_pharmacy",
    "pharmacology_toxicology",
    "pharmacoeconomics_pharmacoepidemiology",
    "pharmacy_education",
    "pharmaceutics_pharmaceutical_sciences",
    "medicinal_chemistry",
    "pharmacognosy_pharmaceutical_biotechnology",
]);

// Users table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    passwordHash: varchar("password_hash", { length: 255 }),
    role: userRoleEnum("role").default("attendee").notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    affiliation: varchar("affiliation", { length: 255 }),
    country: varchar("country", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Abstract submissions table
export const abstracts = pgTable("abstracts", {
    id: serial("id").primaryKey(),
    trackingId: varchar("tracking_id", { length: 20 }).unique().notNull(),
    userId: integer("user_id").references(() => users.id),
    title: varchar("title", { length: 500 }).notNull(),
    authors: text("authors").notNull(),
    affiliations: text("affiliations").notNull(),
    category: topicCategoryEnum("category").notNull(),
    abstractType: abstractTypeEnum("abstract_type").notNull(),
    keywords: varchar("keywords", { length: 255 }),
    abstractText: text("abstract_text").notNull(),
    conflictOfInterest: text("conflict_of_interest"),
    fileUrl: varchar("file_url", { length: 500 }),
    status: abstractStatusEnum("status").default("submitted").notNull(),
    reviewerNotes: text("reviewer_notes"),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Registrations table
export const registrations = pgTable("registrations", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    registrationNumber: varchar("registration_number", { length: 20 })
        .unique()
        .notNull(),
    delegateType: delegateTypeEnum("delegate_type").notNull(),
    category: registrationCategoryEnum("category").notNull(),
    isEarlyBird: boolean("is_early_bird").default(false),
    includesWorkshop: boolean("includes_workshop").default(false),
    includesGalaDinner: boolean("includes_gala_dinner").default(false),
    workshopTopics: text("workshop_topics"),
    dietaryRequirements: varchar("dietary_requirements", { length: 255 }),
    specialNeeds: text("special_needs"),
    status: registrationStatusEnum("status").default("pending").notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("THB").notNull(),
    invoiceUrl: varchar("invoice_url", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payments table
export const payments = pgTable("payments", {
    id: serial("id").primaryKey(),
    registrationId: integer("registration_id").references(() => registrations.id),
    transactionId: varchar("transaction_id", { length: 100 }).unique(),
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("THB").notNull(),
    status: paymentStatusEnum("status").default("pending").notNull(),
    gatewayResponse: text("gateway_response"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Abstract = typeof abstracts.$inferSelect;
export type NewAbstract = typeof abstracts.$inferInsert;
export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
