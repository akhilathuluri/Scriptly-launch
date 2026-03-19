// Convex utilities and helpers
import { ConvexReactClient } from "convex/react";

export const initConvexClient = () => {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;

  if (!convexUrl) {
    console.warn(
      "VITE_CONVEX_URL is not set. Please set it in your .env.local file. See CONVEX_SETUP.md for instructions."
    );
    // Return a client anyway for development, but it won't work
    return new ConvexReactClient("");
  }

  return new ConvexReactClient(convexUrl);
};

export const issueTypeEmojis = {
  bug: "🐛",
  "feature-request": "✨",
  improvement: "📈",
  other: "💬",
} as const;

export const issueTypeLabels = {
  bug: "Bug Report",
  "feature-request": "Feature Request",
  improvement: "Improvement",
  other: "Other",
} as const;

export const severityConfig = {
  critical: {
    label: "Critical",
    emoji: "🔴",
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-200/30",
  },
  high: {
    label: "High",
    emoji: "🟠",
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-200/30",
  },
  medium: {
    label: "Medium",
    emoji: "🟡",
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
    border: "border-yellow-200/30",
  },
  low: {
    label: "Low",
    emoji: "🟢",
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-200/30",
  },
} as const;

export const statusConfig = {
  open: {
    label: "Open",
    emoji: "🔵",
    color: "bg-blue-500/10 text-blue-600 border-blue-200/30",
  },
  "in-progress": {
    label: "In Progress",
    emoji: "🟣",
    color: "bg-purple-500/10 text-purple-600 border-purple-200/30",
  },
  resolved: {
    label: "Resolved",
    emoji: "🟢",
    color: "bg-green-500/10 text-green-600 border-green-200/30",
  },
  closed: {
    label: "Closed",
    emoji: "⚫",
    color: "bg-gray-500/10 text-gray-600 border-gray-200/30",
  },
} as const;
