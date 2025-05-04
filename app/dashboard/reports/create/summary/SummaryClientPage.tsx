"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check } from "lucide-react"
import { format } from "date-fns"
import ReportProgressIndicator from "@/components/reports/report-progress-indicator"
import { mockCountries } from "@/lib/mock-data"

export default function SummaryContent() {
  const router = useRouter()
  const [reportData, setReportData] = useState<any>({})
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  // Load existing data
  useEffect(() => {
    const storedData = localStorage.getItem("reportData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setReportData(parsedData || {})
      } catch (e) {
        console.error("Error parsing report data:", e)
        setReportData({})
      }
    }
  }, [])

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    setTimeout(() => {
      try {
        // In a real app, we would save the report to the database
        console.log(`Generating ${reportData.reportType} report for ${
          reportData.reportType === "meeting" 
          ? reportData.selectedCountry 
          : reportData.selectedCountries?.join(", ")
        }`)

        // Clear the report data from localStorage
        localStorage.removeItem("reportData")

        // Navigate to reports list
        router.push("/dashboard/reports/list")
      } catch (error) {
        console.error("Error generating report:", error)
      } finally {
        setIsGeneratingReport(false)
      }
    }, 2000)
  }

  const handlePrevious = () => {
    // Navigate to previous step based on report type
    if (reportData.reportType === "meeting") {
      router.push("/dashboard/reports/create/talking-points")
    } else {
      router.push("/dashboard/reports/create/country-overview")
    }
  }

  const getCountryName = (code: string) => {
    const country = mockCountries.find((c) => c.code === code)
    return country ? country.name : code
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not_started":
        return <Badge className="bg-gray-500">Not Started</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return null
    }
  }

  // Get list of countries for display based on report type
  const getSelectedCountries = () => {
    if (reportData.reportType === "informative" && reportData.selectedCountries?.length) {
      return reportData.selectedCountries
    }
    return reportData.selectedCountry ? [reportData.selectedCountry] : []
  }

  // Check if country overviews exist
  const hasCountryOverviews = (countryCode: string) => {
    if (reportData.countryOverviews && reportData.countryOverviews[countryCode]) {
      return true
    }
    // Also check if this is the selected country and we have a single country overview
    if (countryCode === reportData.selectedCountry && reportData.countryOverview) {
      return true
    }
    return false
  }

  // Get country overview for a specific country
  const getCountryOverview = (countryCode: string) => {
    if (reportData.countryOverviews && reportData.countryOverviews[countryCode]) {
      return reportData.countryOverviews[countryCode]
    }
    // Also check if this is the selected country and we have a single country overview
    if (countryCode === reportData.selectedCountry && reportData.countryOverview) {
      return reportData.countryOverview
    }
    return {
      economicIndicators: "",
      countryPerception: "",
      tradeSectors: "",
      tradeWithUSA: ""
    }
  }

  const selectedCountries = getSelectedCountries()

  return (
    <div className="space-y-6">
      <ReportProgressIndicator currentStep="summary" reportType={reportData.reportType} />
      
      <p className="text-gray-600">
        Step {reportData.reportType === "meeting" ? "8/8" : "3/3"}: Review and finalize your report
      </p>

      <Card>
        <CardHeader>
          <CardTitle>
            {reportData.reportType === "meeting" ? "Step 8/8: Report Summary" : "Step 3/3: Report Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Report Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">
                      {reportData.reportType === "meeting" ? "Meeting Report" : "Informative Report"}
                    </span>
                  </div>
                  {reportData.reportType === "meeting" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meeting Name:</span>
                        <span className="font-medium">{reportData.meetingName || "Untitled Meeting"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meeting Date:</span>
                        <span className="font-medium">
                          {reportData.meetingDate ? format(new Date(reportData.meetingDate), "PPP") : "Not set"}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">{selectedCountries.length > 1 ? 'Countries:' : 'Country:'}</span>
                    <div className="text-right">
                      {selectedCountries.length > 0 ? (
                        <div className="space-y-1">
                          {selectedCountries.map((countryCode: string) => (
                            <div key={countryCode} className="flex items-center justify-end gap-2 font-medium">
                              <img
                                src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                                alt={getCountryName(countryCode)}
                                className="h-4 w-6 rounded-sm object-cover"
                              />
                              {getCountryName(countryCode)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="font-medium">Not selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {reportData.reportType === "meeting" && (
                <>
                  <div>
                    <h3 className="text-lg font-medium">Profiles</h3>
                    <div className="mt-2">
                      {reportData.selectedProfiles && reportData.selectedProfiles.length > 0 ? (
                        <ul className="space-y-1">
                          {reportData.selectedProfiles.map((profile: any) => (
                            <li key={profile.id} className="flex justify-between">
                              <span>{profile.fullName || "Unnamed Profile"}</span>
                              <span className="text-muted-foreground">{profile.position || "No position"}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No profiles added</p>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium">Bilateral Agreements</h3>
                  <div className="mt-2">
                    {reportData.agreements && reportData.agreements.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between font-medium text-sm">
                          <span>Agreement</span>
                          <span>Status</span>
                        </div>
                        <ul className="space-y-2 border rounded-md divide-y">
                          {reportData.agreements.map((agreement: any) => (
                            <li key={agreement.id} className="flex justify-between items-center p-2">
                              <span className="truncate max-w-[200px]">{agreement.name}</span>
                              <div className="flex items-center gap-2">{getStatusBadge(agreement.status)}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No agreements found</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Country Overview</h3>
                {selectedCountries.length > 0 ? (
                  <div className="mt-2 space-y-4">
                    {selectedCountries.map((countryCode: string) => {
                      const hasOverview = hasCountryOverviews(countryCode);
                      const overview = getCountryOverview(countryCode);
                      
                      return (
                        <div key={countryCode} className="border rounded-md p-3">
                          <div className="flex items-center gap-2 font-medium mb-2">
                            <img
                              src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                              alt={getCountryName(countryCode)}
                              className="h-4 w-6 rounded-sm object-cover"
                            />
                            {getCountryName(countryCode)}
                          </div>
                          {hasOverview ? (
                            <ul className="space-y-1">
                              <li className="flex justify-between">
                                <span>Economic Indicators</span>
                                <span className="text-muted-foreground">
                                  {overview.economicIndicators ? "Completed" : "Not completed"}
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Country Perception</span>
                                <span className="text-muted-foreground">
                                  {overview.countryPerception ? "Completed" : "Not completed"}
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Trade Sectors</span>
                                <span className="text-muted-foreground">
                                  {overview.tradeSectors ? "Completed" : "Not completed"}
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span>Trade with USA</span>
                                <span className="text-muted-foreground">
                                  {overview.tradeWithUSA ? "Completed" : "Not completed"}
                                </span>
                              </li>
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No overview data</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">No country selected</p>
                )}
              </div>

              {reportData.reportType === "meeting" && (
                <>
                  <div>
                    <h3 className="text-lg font-medium">News & Events</h3>
                    <div className="mt-2">
                      <span className="text-muted-foreground">{reportData.newsEvents ? "Completed" : "Not completed"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Action Items</h3>
                    <div className="mt-2">
                      {reportData.actionItems && reportData.actionItems.length > 0 ? (
                        <ul className="space-y-1">
                          {reportData.actionItems.map((item: any) => (
                            <li key={item.id} className="flex justify-between">
                              <span className="truncate max-w-[200px]">{item.title}</span>
                              {getStatusBadge(item.status)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No action items added</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Talking Points</h3>
                    <div className="mt-2">
                      {reportData.talkingPoints && reportData.talkingPoints.length > 0 ? (
                        <ul className="space-y-1">
                          {reportData.talkingPoints.map((point: any) => (
                            <li key={point.id}>{point.title}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No talking points added</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between space-x-4">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="bg-green-600 hover:bg-green-700">
          {isGeneratingReport ? "Generating..." : "Generate Final Report"} <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

