import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  app: defineTable({
    app_id: v.string(),
    app_name: v.string(),
    latest_version: v.string(),
    minimum_version: v.string(),
    download_url: v.string(),
    download_sha256: v.optional(v.string()),
    download_url_win_x64: v.optional(v.string()),
    sha256_win_x64: v.optional(v.string()),
    download_url_win_arm64: v.optional(v.string()),
    sha256_win_arm64: v.optional(v.string()),
    downloads: v.optional(
      v.record(
        v.string(),
        v.object({
          url: v.string(),
          sha256: v.string(),
        })
      )
    ),
    release_notes: v.string(),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_app_id", ["app_id"])
    .index("by_app_name", ["app_name"]),
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
  developerNotifications: defineTable({
    title: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("update")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    isActive: v.boolean(),
    ctaLabel: v.optional(v.string()),
    ctaUrl: v.optional(v.string()),
    startsAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_isActive", ["isActive"])
    .index("by_priority", ["priority"]),
});
