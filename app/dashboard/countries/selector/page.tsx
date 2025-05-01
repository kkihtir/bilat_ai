import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CountrySelector from "@/components/countries/country-selector";

export default function CountrySelectorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Country Selector</h1>
          <p className="mt-2 text-gray-600">
            Select a country to view comprehensive information
          </p>
        </div>
        <CountrySelector />
      </div>
    </DashboardLayout>
  );
}
