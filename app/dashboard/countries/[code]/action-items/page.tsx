import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CountryActionItemsBoard from "@/components/action-items/country-action-items-board";
import { mockCountries } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  const country = mockCountries.find((c) => c.code === params.code);
  return {
    title: country
      ? `${country.name} Action Items | Staff Portal`
      : "Country Action Items | Staff Portal",
    description: country
      ? `View action items summary for ${country.name}`
      : "View country action items summary",
  };
};

export default function CountryActionItemsPage({
  params,
}: {
  params: { code: string };
}) {
  const country = mockCountries.find((c) => c.code === params.code);

  if (!country) {
    notFound();
  }

  const countrySubPages = [
    { name: "Overview", href: `/dashboard/countries/${params.code}` },
    {
      name: "Action Items",
      href: `/dashboard/countries/${params.code}/action-items`,
    },
    { name: "Profiles", href: `/dashboard/countries/${params.code}/profiles` },
    {
      name: "Agreements",
      href: `/dashboard/countries/${params.code}/agreements`,
    },
    { name: "Reports", href: `/dashboard/countries/${params.code}/reports` },
    {
      name: "Talking Points",
      href: `/dashboard/countries/${params.code}/talking-points`,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" asChild>
            <Link href={`/dashboard/countries/${params.code}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Link href="/dashboard/countries" className="hover:text-primary">
            Countries
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 py-1 -ml-2 hover:bg-transparent hover:text-primary flex items-center gap-1"
              >
                {country.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {mockCountries.map((page) => (
                <DropdownMenuItem key={page.code} asChild>
                  <Link
                    href={`/dashboard/countries/${page.code}`}
                    className="flex items-center"
                  >
                    {page.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight className="h-4 w-4 mx-2" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 py-1 -ml-2 hover:bg-transparent hover:text-primary flex items-center gap-1"
              >
                Action Items
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {countrySubPages.map((page) => (
                <DropdownMenuItem key={page.href} asChild>
                  <Link href={page.href} className="flex items-center">
                    {page.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src={`https://flagcdn.com/${params.code.toLowerCase()}.svg`}
            alt={`${country.name} flag`}
            className="h-8 w-12 rounded-sm object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{country.name} Action Items</h1>
            <p className="mt-1 text-gray-600">
              Track and manage action items for {country.name}
            </p>
          </div>
        </div>

        <CountryActionItemsBoard countryCode={params.code} />
      </div>
    </DashboardLayout>
  );
}
