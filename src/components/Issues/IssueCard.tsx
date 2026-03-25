import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

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

const typeEmojis = {
  bug: "🐛",
  "feature-request": "✨",
  improvement: "📈",
  other: "💬",
};

const typeLabels = {
  bug: "Bug Report",
  "feature-request": "Feature Request",
  improvement: "Improvement",
  other: "Other",
};

const severityConfig = {
  critical: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-200/30", label: "Critical" },
  high: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-200/30", label: "High" },
  medium: { bg: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-200/30", label: "Medium" },
  low: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-200/30", label: "Low" },
};

const statusConfig = {
  open: { label: "Open", color: "bg-blue-500/10 text-blue-600 border-blue-200/30" },
  "in-progress": { label: "In Progress", color: "bg-purple-500/10 text-purple-600 border-purple-200/30" },
  resolved: { label: "Resolved", color: "bg-green-500/10 text-green-600 border-green-200/30" },
  closed: { label: "Closed", color: "bg-gray-500/10 text-gray-600 border-gray-200/30" },
};

interface IssueCardProps {
  issue: Issue;
  index: number;
}

export const IssueCard = ({ issue, index }: IssueCardProps) => {
  const created = new Date(issue.createdAt);
  const severityConfig_ =
    severityConfig[issue.severity] ??
    ({
      bg: "bg-gray-500/10",
      text: "text-gray-600",
      border: "border-gray-200/30",
      label: "Unknown",
    } as const);
  const statusConfig_ =
    statusConfig[issue.status] ??
    ({
      label: "Unknown",
      color: "bg-gray-500/10 text-gray-600 border-gray-200/30",
    } as const);
  const typeEmoji = typeEmojis[issue.type] ?? "💬";
  const typeLabel = typeLabels[issue.type] ?? "Other";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 hover:bg-card/60 transition-colors duration-300 group"
    >
      {/* Header: Title and Type Badge */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {typeEmoji} {issue.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {issue.description}
          </p>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Type Badge */}
        <Badge variant="outline" className="text-xs">
          {typeLabel}
        </Badge>

        {/* Severity Badge */}
        <Badge
          variant="outline"
          className={`text-xs ${severityConfig_.bg} ${severityConfig_.text} border ${severityConfig_.border}`}
        >
          {severityConfig_.label}
        </Badge>

        {/* Status Badge */}
        <Badge
          variant="outline"
          className={`text-xs border ${statusConfig_.color}`}
        >
          {statusConfig_.label}
        </Badge>
      </div>

      {/* Footer: Email and Time */}
      <div className="flex items-center justify-end text-xs text-muted-foreground">
        <span>{formatDistanceToNow(created, { addSuffix: true })}</span>
      </div>
    </motion.div>
  );
};
