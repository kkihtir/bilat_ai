import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DataSourcesManager from "@/components/data-sources/data-sources-manager";

export default function DataSourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="mt-2 text-gray-600">
            Manage and synchronize data sources for reports and country profiles
          </p>
        </div>
        <DataSourcesManager />
      </div>
    </DashboardLayout>
  );
}
