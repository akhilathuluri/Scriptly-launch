import { query } from "./_generated/server";
import { v } from "convex/values";

// Returns developer notifications, active-only by default.
export const listDeveloperNotifications = query({
  args: {
    includeInactive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.includeInactive) {
      return await ctx.db.query("developerNotifications").collect();
    }

    return await ctx.db
      .query("developerNotifications")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
  },
});
