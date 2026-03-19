import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  issues: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.union(
      v.literal("bug"),
      v.literal("feature-request"),
      v.literal("improvement"),
      v.literal("other")
    ),
    severity: v.union(
      v.literal("critical"),
      v.literal("high"),
      v.literal("medium"),
      v.literal("low")
    ),
    email: v.string(),
    userAgent: v.optional(v.string()),
    status: v.union(
      v.literal("open"),
      v.literal("in-progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),
});
