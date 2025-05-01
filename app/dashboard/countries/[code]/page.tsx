import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import CountryOverview from "@/components/countries/country-overview"
import { mockCountries } from "@/lib/mock-data"


export default async function CountryOverviewPage({ params }: { params: { code: string } }) {
  // await params
  const { code } = await params
  const country = mockCountries.find((c) => c.code === code)

  if (!country) {
    notFound()
  }

  return (
    <DashboardLayout>
      <CountryOverview countryCode={params.code} />
    </DashboardLayout>
  )
}

