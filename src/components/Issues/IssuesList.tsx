import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueCard } from "./IssueCard";

interface Issue {
  _id: string;
  title: string;
  description: string;
  type: "bug" | "feature-request" | "improvement" | "other";
  severity: "critical" | "high" | "medium" | "low";
  email: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: number;
  updatedAt: number;
}

type FilterStatus = "all" | "open" | "in-progress" | "resolved" | "closed";

interface IssuesListProps {
  refreshTrigger?: number;
}

export const IssuesList = ({ refreshTrigger }: IssuesListProps) => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const issues = useQuery(api.issues.listIssues, {
    status: filterStatus === "all" ? undefined : filterStatus,
  });

  if (issues === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
        <p className="text-muted-foreground">Loading issues...</p>
      </motion.div>
    );
  }

  const isEmpty = !issues || issues.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header and Filter */}
      <div className="flex items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reported Issues</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Total issues: {issues?.length || 0}
          </p>
        </div>

        {/* Filter Dropdown */}
        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
          <SelectTrigger className="w-[180px] border-border bg-card text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="open">🔵 Open</SelectItem>
            <SelectItem value="in-progress">🟣 In Progress</SelectItem>
            <SelectItem value="resolved">🟢 Resolved</SelectItem>
            <SelectItem value="closed">⚫ Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issues Grid or Empty State */}
      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 px-6"
        >
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No issues found
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            {filterStatus === "all"
              ? "Great! No issues have been reported yet. Help us improve by reporting any issues you find."
              : `No issues with status "${filterStatus}" at the moment.`}
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {issues.map((issue, index) => (
            <IssueCard key={issue._id} issue={issue as Issue} index={index} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
