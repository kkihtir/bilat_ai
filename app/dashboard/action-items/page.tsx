import DashboardLayout from "@/components/dashboard/dashboard-layout";
import ActionItemsBoard from "@/components/action-items/action-items-board";

export default function ActionItemsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Action Items Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track and manage agreed actions across countries and sectors
          </p>
        </div>
        <ActionItemsBoard />
      </div>
    </DashboardLayout>
  );
}
