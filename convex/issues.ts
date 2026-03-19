import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new issue
export const createIssue = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const issueId = await ctx.db.insert("issues", {
      title: args.title,
      description: args.description,
      type: args.type,
      severity: args.severity,
      email: args.email,
      userAgent: args.userAgent,
      status: "open",
      createdAt: now,
      updatedAt: now,
    });
    return issueId;
  },
});

// Get all issues
export const listIssues = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("open"),
        v.literal("in-progress"),
        v.literal("resolved"),
        v.literal("closed")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("issues")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .order("desc")
        .take(100);
    }

    return await ctx.db.query("issues").order("desc").take(100);
  },
});

// Get single issue by ID
export const getIssue = query({
  args: {
    id: v.id("issues"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update issue status (admin only in production)
export const updateIssueStatus = mutation({
  args: {
    id: v.id("issues"),
    status: v.union(
      v.literal("open"),
      v.literal("in-progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

// Get issues count
export const getIssuesCount = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("open"),
        v.literal("in-progress"),
        v.literal("resolved"),
        v.literal("closed")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      const issues = await ctx.db
        .query("issues")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .collect();
      return issues.length;
    }

    const issues = await ctx.db.query("issues").collect();
    return issues.length;
  },
});
