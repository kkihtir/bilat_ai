"use client"

import { useState, useEffect } from "react"
import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import SummaryClientPage from "./SummaryClientPage"

export const metadata: Metadata = {
  title: "Report Summary | Staff Portal",
  description: "Review and finalize your report",
}

export default function SummaryPage() {
  // This is now a client component to access localStorage
  const [stepNumber, setStepNumber] = useState<string>("8")
  
  useEffect(() => {
    // Get step number based on report type
    const reportData = localStorage.getItem("reportData")
    if (reportData) {
      const parsedData = JSON.parse(reportData)
      setStepNumber(parsedData.reportType === "meeting" ? "8" : "3")
    }
  }, [])
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Report</h1>
          <p className="mt-2 text-gray-600">Step {stepNumber}: Review and finalize your report</p>
        </div>
        <SummaryClientPage />
      </div>
    </DashboardLayout>
  )
}

