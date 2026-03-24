import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Validation schema
const issueFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  type: z.enum(["bug", "feature-request", "improvement", "other"], {
    errorMap: () => ({ message: "Please select a valid issue type" }),
  }),
  severity: z.enum(["critical", "high", "medium", "low"], {
    errorMap: () => ({ message: "Please select a valid severity level" }),
  }),
  email: z.string().email("Please enter a valid email address"),
});

type IssueFormValues = z.infer<typeof issueFormSchema>;

interface IssueFormProps {
  onSuccess?: () => void;
}

export const IssueForm = ({ onSuccess }: IssueFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createIssue = useMutation(api.issues.createIssue);
  const { toast } = useToast();

  const form = useForm<IssueFormValues>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "bug",
      severity: "medium",
      email: "",
    },
  });

  const onSubmit = async (values: IssueFormValues) => {
    setIsSubmitting(true);
    try {
      const userAgent = navigator.userAgent;
      await createIssue({
        title: values.title,
        description: values.description,
        type: values.type,
        severity: values.severity,
        email: values.email,
        userAgent,
      });

      toast({
        title: "Success",
        description: "Your issue has been submitted successfully. Thank you for your feedback!",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit issue:", error);
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto rounded-2xl glass-surface p-8 border border-border/50"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Report an Issue</h2>
        <p className="text-muted-foreground">
          Help us improve Spark by reporting bugs, suggesting features, or providing feedback.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Issue Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief summary of the issue"
                    {...field}
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/100 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Detailed Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the issue in detail. Include steps to reproduce if it's a bug."
                    {...field}
                    className="min-h-[150px] resize-none border-border bg-card text-foreground placeholder:text-muted-foreground"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/2000 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type and Severity Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issue Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Issue Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="border-border bg-card text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="bug">🐛 Bug Report</SelectItem>
                      <SelectItem value="feature-request">✨ Feature Request</SelectItem>
                      <SelectItem value="improvement">📈 Improvement</SelectItem>
                      <SelectItem value="other">💬 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Severity */}
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Severity Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="border-border bg-card text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="critical">🔴 Critical</SelectItem>
                      <SelectItem value="high">🟠 High</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="low">🟢 Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Your Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    {...field}
                    className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  We'll use this to contact you about your issue if needed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-primary/5 p-4 flex gap-3"
          >
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Your submission is secure and encrypted. We respect your privacy and will never share your email without permission.
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Issue"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
