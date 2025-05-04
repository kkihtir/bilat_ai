import DashboardLayout from "@/components/dashboard/dashboard-layout"
import SummaryClientPage from "./SummaryClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Report Summary | Staff Portal",
  description: "Review and finalize your report",
}

export default function SummaryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Report</h1>
          <SummaryClientPage />
        </div>
      </div>
    </DashboardLayout>
  )
}

