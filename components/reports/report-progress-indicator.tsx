"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Step =
  | "report-info"
  | "profiles"
  | "country-overview"
  | "news-events"
  | "agreements"
  | "action-items"
  | "talking-points"
  | "summary"

interface ReportProgressIndicatorProps {
  currentStep: Step
  reportType?: "meeting" | "informative"
}

export default function ReportProgressIndicator({ 
  currentStep, 
  reportType: propReportType 
}: ReportProgressIndicatorProps) {
  const [reportType, setReportType] = useState<"meeting" | "informative">(propReportType || "meeting")
  
  // Update reportType when prop changes
  useEffect(() => {
    if (propReportType) {
      setReportType(propReportType)
    }
  }, [propReportType])
  
  // Load report type from localStorage if not provided as prop
  useEffect(() => {
    if (!propReportType) {
      const reportData = localStorage.getItem("reportData")
      if (reportData) {
        const parsedData = JSON.parse(reportData)
        if (parsedData.reportType === "meeting" || parsedData.reportType === "informative") {
          setReportType(parsedData.reportType)
        }
      }
    }
  }, [propReportType])

  // Define steps based on report type
  const meetingSteps: { id: Step; label: string }[] = [
    { id: "report-info", label: "Info" },
    { id: "profiles", label: "Profiles" },
    { id: "country-overview", label: "Overview" },
    { id: "news-events", label: "News" },
    { id: "agreements", label: "Agreements" },
    { id: "action-items", label: "Action Items" },
    { id: "talking-points", label: "Talking Points" },
    { id: "summary", label: "Summary" },
  ]
  
  const informativeSteps: { id: Step; label: string }[] = [
    { id: "report-info", label: "Info" },
    { id: "country-overview", label: "Overview" },
    { id: "summary", label: "Summary" },
  ]
  
  // Select appropriate steps based on report type
  const steps = reportType === "meeting" ? meetingSteps : informativeSteps

  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="w-full bg-muted rounded-lg p-1">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
            <div
              className={cn(
                "rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm",
                currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : index < currentIndex
                    ? "bg-primary/70 text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("h-1 flex-1 mx-2", index < currentIndex ? "bg-primary/70" : "bg-muted-foreground/20")}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-xs">
        {steps.map((step) => (
          <div key={step.id} className="flex-1 text-center">
            {step.label}
          </div>
        ))}
      </div>
    </div>
  )
}

