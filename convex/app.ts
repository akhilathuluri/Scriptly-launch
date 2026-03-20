import { query } from "./_generated/server";
import { v } from "convex/values";

const compareSemver = (a: string, b: string): number => {
  const aParts = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const maxLen = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLen; i += 1) {
    const av = aParts[i] ?? 0;
    const bv = bParts[i] ?? 0;

    if (av > bv) return 1;
    if (av < bv) return -1;
  }

  return 0;
};

// Returns the entire app table with all records/content.
export const getAppTableContent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("app").collect();
  },
});

// Returns one app record by app_id.
export const getAppById = query({
  args: {
    app_id: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("app")
      .withIndex("by_app_id", (q) => q.eq("app_id", args.app_id))
      .first();

    return record;
  },
});

// Verification API: other apps can call this and reject when verified=false.
export const verifyAppAccess = query({
  args: {
    app_id: v.string(),
    current_version: v.string(),
    app_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const appRecord = await ctx.db
      .query("app")
      .withIndex("by_app_id", (q) => q.eq("app_id", args.app_id))
      .first();

    if (!appRecord) {
      return {
        verified: false,
        reason: "app_not_found",
        message: "App is not registered.",
      };
    }

    if (args.app_name && args.app_name !== appRecord.app_name) {
      return {
        verified: false,
        reason: "app_name_mismatch",
        message: "App name does not match registered app.",
        expected_app_name: appRecord.app_name,
      };
    }

    const meetsMinimum =
      compareSemver(args.current_version, appRecord.minimum_version) >= 0;

    if (!meetsMinimum) {
      return {
        verified: false,
        reason: "version_below_minimum",
        message: "Current version is below minimum required version.",
        current_version: args.current_version,
        minimum_version: appRecord.minimum_version,
        latest_version: appRecord.latest_version,
        download_url: appRecord.download_url,
        release_notes: appRecord.release_notes,
      };
    }

    return {
      verified: true,
      reason: "ok",
      message: "App verified successfully.",
      app: appRecord,
    };
  },
});
