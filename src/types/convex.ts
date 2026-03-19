// Convex API types - Auto-generated
// This file provides type safety for Convex API calls
export type Issue = {
  _id: string;
  title: string;
  description: string;
  type: "bug" | "feature-request" | "improvement" | "other";
  severity: "critical" | "high" | "medium" | "low";
  email: string;
  userAgent?: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: number;
  updatedAt: number;
};

export type CreateIssueInput = Omit<
  Issue,
  "_id" | "status" | "createdAt" | "updatedAt"
>;

export type UpdateIssueStatusInput = {
  id: string;
  status: Issue["status"];
};

export type IssueFilter = {
  status?: Issue["status"];
};
