import { notFound } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { mockCountries } from "@/lib/mock-data";
import { mockReports } from "@/lib/mock-reports";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  title: string;
  country: string;
  date: string | null;
  type: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  approvalStatus: string;
}

export default function CountryReportsPage({
  params,
}: {
  params: { code: string };
}) {
  const country = mockCountries.find((c) => c.code === params.code);
  const countryReports = mockReports.filter(
    (report: Report) => report.country === params.code
  );

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

  // Get approval badge for reports
  const getApprovalBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" asChild>
            <Link href="/dashboard/countries">
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
              {mockCountries.map((c) => (
                <DropdownMenuItem key={c.code} asChild>
                  <Link
                    href={`/dashboard/countries/${c.code}`}
                    className="flex items-center"
                  >
                    <img
                      src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                      alt={`${c.name} flag`}
                      className="h-4 w-6 mr-2 rounded-sm object-cover"
                    />
                    {c.name}
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
                Reports
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

        {/* Header with Flag */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center space-x-3">
            <img
              src={`https://flagcdn.com/${params.code.toLowerCase()}.svg`}
              alt={`${country.name} flag`}
              className="h-8 w-12 rounded-sm object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="mt-1 text-muted-foreground">
                View and manage reports for {country.name}
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/reports/create">
              <Plus className="mr-2 h-4 w-4" /> Create New Report
            </Link>
          </Button>
        </div>

        {countryReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryReports.map((report: Report) => (
              <Card
                key={report.id}
                className="overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center dark:text-white">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      {report.title}
                    </CardTitle>
                    {getApprovalBadge(report.approvalStatus)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Created by: {report.createdBy.name}</p>
                    {report.date && <p>Meeting Date: {report.date}</p>}
                    <p>Created: {report.createdAt}</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/dashboard/reports/${report.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No reports found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No reports have been created for {country.name} yet.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/reports/create">
                  <Plus className="mr-2 h-4 w-4" /> Create New Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
