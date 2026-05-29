import * as React from "react"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive"
    testId?: string
  }
>(({ className, variant = "default", testId, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    data-testid={testId}
    className={cn(
      "relative w-full rounded-lg border p-4",
      variant === "default" && "border-border text-foreground",
      variant === "destructive" && "border-destructive/50 text-destructive dark:border-destructive",
      className
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
