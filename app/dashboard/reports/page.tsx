import DashboardLayout from "@/components/dashboard/dashboard-layout";
import ReportsList from "@/components/reports/reports-list";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="mt-2 text-gray-600">
            View, manage, and create reports for VIPs
          </p>
        </div>
        <ReportsList />
      </div>
    </DashboardLayout>
  );
}
