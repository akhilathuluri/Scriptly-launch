import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { normalizeAppDownloads } from "./lib/appDownloads";

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

// Backfills optional download metadata fields for existing app rows.
// Run this once from Convex Dashboard after deploying the widened schema.
export const backfillAppDownloadFields = mutation({
  args: {},
  handler: async (ctx) => {
    let scanned = 0;
    let updated = 0;

    for await (const row of ctx.db.query("app")) {
      scanned += 1;

      const normalized = normalizeAppDownloads({
        download_url: row.download_url,
        download_sha256: row.download_sha256,
        download_url_win_x64: row.download_url_win_x64,
        sha256_win_x64: row.sha256_win_x64,
        download_url_win_arm64: row.download_url_win_arm64,
        sha256_win_arm64: row.sha256_win_arm64,
        downloads: row.downloads,
      });

      const needsUpdate =
        row.download_sha256 !== normalized.download_sha256 ||
        row.download_url_win_x64 !== normalized.download_url_win_x64 ||
        row.sha256_win_x64 !== normalized.sha256_win_x64 ||
        row.download_url_win_arm64 !== normalized.download_url_win_arm64 ||
        row.sha256_win_arm64 !== normalized.sha256_win_arm64 ||
        row.downloads?.["win-x64"]?.url !== normalized.downloads["win-x64"].url ||
        row.downloads?.["win-x64"]?.sha256 !== normalized.downloads["win-x64"].sha256 ||
        row.downloads?.["win-arm64"]?.url !== normalized.downloads["win-arm64"].url ||
        row.downloads?.["win-arm64"]?.sha256 !== normalized.downloads["win-arm64"].sha256;

      if (!needsUpdate) {
        continue;
      }

      await ctx.db.patch(row._id, {
        download_sha256: normalized.download_sha256,
        download_url_win_x64: normalized.download_url_win_x64,
        sha256_win_x64: normalized.sha256_win_x64,
        download_url_win_arm64: normalized.download_url_win_arm64,
        sha256_win_arm64: normalized.sha256_win_arm64,
        downloads: normalized.downloads,
        updated_at: Math.floor(Date.now() / 1000),
      });

      updated += 1;
    }

    return {
      ok: true,
      scanned,
      updated,
    };
  },
});
