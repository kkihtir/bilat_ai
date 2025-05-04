"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, Trash2, User, ArrowRight, ArrowLeft, Check, FileText, Sparkles, X, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { mockCountries, mockProfiles } from "@/lib/mock-data"
import ReportsList from "@/components/reports/reports-list"
import { Badge } from "@/components/ui/badge"
import { mockTalkingPoints } from "@/lib/mock-talking-points"
import { mockAgreements } from "@/lib/mock-agreements"
import { mockActionItems } from "@/lib/mock-action-items"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReportGenerator() {
  const [activeStep, setActiveStep] = useState("reports-list")
  const [reportType, setReportType] = useState("meeting")
  const [meetingName, setMeetingName] = useState("")
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedProfiles, setSelectedProfiles] = useState<any[]>([])
  const [countryOverview, setCountryOverview] = useState({
    economicIndicators: "",
    countryPerception: "",
    tradeSectors: "",
    tradeWithUSA: "",
  })
  const [newsEvents, setNewsEvents] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [selectedTalkingPoints, setSelectedTalkingPoints] = useState<string[]>([])
  const [customTalkingPoint, setCustomTalkingPoint] = useState({
    title: "",
    context: "",
    discussionPoints: "",
  })

  // Add these state variables for action items
  const [selectedActionItems, setSelectedActionItems] = useState<string[]>([])
  const [generatedActionItem, setGeneratedActionItem] = useState({
    title: "",
    description: "",
    status: "not_started",
    dueDate: "",
    owner: "",
  })

  // Mock data for previously generated reports
  const [savedReports, setSavedReports] = useState([
    {
      id: "1",
      title: "US-Japan Trade Meeting",
      country: "jp",
      date: "2025-03-10",
      type: "meeting",
      createdAt: "2025-03-05",
    },
    {
      id: "2",
      title: "Germany Economic Overview",
      country: "de",
      date: null,
      type: "informative",
      createdAt: "2025-02-28",
    },
    {
      id: "3",
      title: "UK Diplomatic Relations",
      country: "gb",
      date: "2025-04-15",
      type: "meeting",
      createdAt: "2025-02-20",
    },
  ])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    // In a real app, we would fetch profiles for this country
    setSelectedProfiles(mockProfiles.filter((profile) => profile.country === country).slice(0, 2))
  }

  const handleMultiCountryChange = (countries: string[]) => {
    setSelectedCountries(countries)
  }

  const handleAddProfile = () => {
    const newProfile = {
      id: Date.now().toString(),
      fullName: "",
      position: "",
      type: "ambassador",
      education: "",
      overview: "",
      imageUrl: "",
    }
    setSelectedProfiles([...selectedProfiles, newProfile])
  }

  const handleRemoveProfile = (profileId: string) => {
    setSelectedProfiles(selectedProfiles.filter((profile) => profile.id !== profileId))
  }

  const updateProfile = (id: string, field: string, value: string) => {
    setSelectedProfiles(
      selectedProfiles.map((profile) => (profile.id === id ? { ...profile, [field]: value } : profile)),
    )
  }

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      updateProfile(id, "imageUrl", imageUrl)
    }
  }

  const generateWithAI = (section: string, profileId?: string) => {
    setIsGenerating(true)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      if (section === "profile" && profileId) {
        setSelectedProfiles(
          selectedProfiles.map((profile) => {
            if (profile.id === profileId) {
              return {
                ...profile,
                education: "Generated education background with AI for " + profile.fullName,
                overview: "Generated overview with AI for " + profile.fullName,
              }
            }
            return profile
          }),
        )
      } else if (section === "profile" && !profileId) {
        setSelectedProfiles(
          selectedProfiles.map((profile) => ({
            ...profile,
            education: "Generated education background with AI...",
            overview: "Generated overview with AI...",
          })),
        )
      } else if (section === "country") {
        setCountryOverview({
          economicIndicators: "GDP: $X trillion\nInflation: X%\nUnemployment: X%\nCurrency: XXX",
          countryPerception: "Country perception analysis generated by AI...",
          tradeSectors: "Major sectors include technology, agriculture, and manufacturing...",
          tradeWithUSA: "Trade volume: $X billion\nMajor exports: X, Y, Z\nMajor imports: A, B, C",
        })
      } else if (section === "economicIndicators") {
        setCountryOverview({
          ...countryOverview,
          economicIndicators: "GDP: $X trillion\nInflation: X%\nUnemployment: X%\nCurrency: XXX",
        })
      } else if (section === "countryPerception") {
        setCountryOverview({
          ...countryOverview,
          countryPerception: "Country perception analysis generated by AI...",
        })
      } else if (section === "tradeSectors") {
        setCountryOverview({
          ...countryOverview,
          tradeSectors: "Major sectors include technology, agriculture, and manufacturing...",
        })
      } else if (section === "tradeWithUSA") {
        setCountryOverview({
          ...countryOverview,
          tradeWithUSA: "Trade volume: $X billion\nMajor exports: X, Y, Z\nMajor imports: A, B, C",
        })
      } else if (section === "news") {
        setNewsEvents(
          "• Major policy announcement affecting international trade\n" +
            "• New diplomatic initiative launched\n" +
            "• Economic growth exceeds expectations\n" +
            "• Infrastructure development project announced\n" +
            "• Technology sector sees significant investment\n" +
            "• Environmental protection measures implemented\n" +
            "• Cultural exchange program expanded\n" +
            "• Healthcare system reforms introduced\n" +
            "• Educational partnerships with international institutions\n" +
            "• Tourism industry recovery shows positive signs",
        )
      } else if (section === "talkingPoint") {
        setCustomTalkingPoint({
          ...customTalkingPoint,
          discussionPoints:
            "• Discuss potential collaboration in key sectors\n• Explore opportunities for investment and trade expansion\n• Address regulatory challenges and propose solutions",
        })
      } else if (section === "actionItem") {
        setGeneratedActionItem({
          ...generatedActionItem,
          description: "AI-generated action item description with key steps and expected outcomes.",
        })
      }
      setIsGenerating(false)
    }, 2000)
  }

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    setTimeout(() => {
      // Add the new report to the saved reports
      const reportTitle = reportType === "meeting" 
        ? meetingName || `${getCountryName(selectedCountry)} Meeting`
        : `${selectedCountries.map(code => getCountryName(code)).join(", ")} Report`;
      
      const newReport = {
        id: Date.now().toString(),
        title: reportTitle,
        country: reportType === "meeting" ? selectedCountry : selectedCountries[0],
        date: meetingDate ? format(meetingDate, "yyyy-MM-dd") : null,
        type: reportType,
        createdAt: format(new Date(), "yyyy-MM-dd"),
        createdBy: "Current User",
        approvalStatus: "pending"
      }

      setSavedReports([newReport, ...savedReports])

      // Reset form and go back to reports list
      resetForm()
      setActiveStep("reports-list")
      setIsGeneratingReport(false)
    }, 2000)
  }

  const resetForm = () => {
    setReportType("meeting")
    setMeetingName("")
    setMeetingDate(undefined)
    setSelectedCountry("")
    setSelectedCountries([])
    setSelectedProfiles([])
    setCountryOverview({
      economicIndicators: "",
      countryPerception: "",
      tradeSectors: "",
      tradeWithUSA: "",
    })
    setNewsEvents("")
    setSelectedTalkingPoints([])
    setCustomTalkingPoint({
      title: "",
      context: "",
      discussionPoints: "",
    })
    setSelectedActionItems([])
    setGeneratedActionItem({
      title: "",
      description: "",
      status: "not_started",
      dueDate: "",
      owner: "",
    })
  }

  const getCountryName = (code: string) => {
    const country = mockCountries.find((c) => c.code === code)
    return country ? country.name : code
  }

  const handleEditReport = (reportId: string) => {
    // In a real app, we would fetch the report data
    // For now, just navigate to the report form
    setActiveStep("report-info")
  }

  const handleNext = () => {
    // Different steps for meeting reports vs. informative reports
    const meetingSteps = [
      "reports-list",
      "report-info",
      "profiles",
      "country-overview",
      "news-events",
      "agreements",
      "action-items-selection",
      "talking-points-selection",
      "summary",
    ]
    
    const informativeSteps = [
      "reports-list",
      "report-info",
      "country-overview",
      "summary",
    ]
    
    const steps = reportType === "meeting" ? meetingSteps : informativeSteps
    const currentIndex = steps.indexOf(activeStep)
    
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    // Different steps for meeting reports vs. informative reports
    const meetingSteps = [
      "reports-list",
      "report-info",
      "profiles",
      "country-overview",
      "news-events",
      "agreements",
      "action-items-selection",
      "talking-points-selection",
      "summary",
    ]
    
    const informativeSteps = [
      "reports-list",
      "report-info",
      "country-overview",
      "summary",
    ]
    
    const steps = reportType === "meeting" ? meetingSteps : informativeSteps
    const currentIndex = steps.indexOf(activeStep)
    
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1])
    }
  }

  const handleNewReport = () => {
    resetForm()
    setActiveStep("report-info")
  }

  // Get country-specific agreements
  const getCountryAgreements = (countryCode: string) => {
    return mockAgreements.filter((agreement) => agreement.country === countryCode)
  }

  // Get country-specific action items
  const getCountryActionItems = (countryCode: string) => {
    return mockActionItems.filter((item) => item.country === countryCode)
  }

  // Get country-specific talking points
  const getCountryTalkingPoints = (countryCode: string) => {
    // In a real app, we would filter by country code
    return mockTalkingPoints
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "planned":
        return <Badge className="bg-amber-500">Planned</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Expired
          </Badge>
        )
      default:
        return null
    }
  }

  // Toggle talking point selection
  const toggleTalkingPoint = (id: string) => {
    if (selectedTalkingPoints.includes(id)) {
      setSelectedTalkingPoints(selectedTalkingPoints.filter((tpId) => tpId !== id))
    } else {
      setSelectedTalkingPoints([...selectedTalkingPoints, id])
    }
  }

  // Toggle action item selection
  const toggleActionItem = (id: string) => {
    if (selectedActionItems.includes(id)) {
      setSelectedActionItems(selectedActionItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedActionItems([...selectedActionItems, id])
    }
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      {activeStep !== "reports-list" && (
        <div className="w-full bg-muted rounded-lg p-1">
          <div className="flex justify-between">
            {reportType === "meeting" ? (
              // Meeting report steps
              [
                "report-info",
                "profiles",
                "country-overview",
                "news-events",
                "agreements",
                "action-items-selection",
                "talking-points-selection",
                "summary",
              ].map((step, index) => (
                <div key={step} className={`flex items-center ${index < 7 ? "flex-1" : ""}`}>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm ${
                      activeStep === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 7 && <div className="h-1 flex-1 mx-2 bg-muted-foreground/20"></div>}
                </div>
              ))
            ) : (
              // Informative report steps (only info, overview, summary)
              [
                "report-info",
                "country-overview",
                "summary",
              ].map((step, index) => (
                <div key={step} className={`flex items-center ${index < 2 ? "flex-1" : ""}`}>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm ${
                      activeStep === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 2 && <div className="h-1 flex-1 mx-2 bg-muted-foreground/20"></div>}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mt-1 text-xs">
            {reportType === "meeting" ? (
              // Meeting report step labels
              <>
                <div className="flex-1 text-center">Info</div>
                <div className="flex-1 text-center">Profiles</div>
                <div className="flex-1 text-center">Overview</div>
                <div className="flex-1 text-center">News</div>
                <div className="flex-1 text-center">Agreements</div>
                <div className="flex-1 text-center">Action Items</div>
                <div className="flex-1 text-center">Talking Points</div>
                <div className="flex-1 text-center">Summary</div>
              </>
            ) : (
              // Informative report step labels
              <>
                <div className="flex-1 text-center">Info</div>
                <div className="flex-1 text-center">Overview</div>
                <div className="flex-1 text-center">Summary</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Reports List */}
      {activeStep === "reports-list" && (
        <ReportsList reports={savedReports} onNewReport={handleNewReport} onEditReport={handleEditReport} />
      )}

      {/* Report Info */}
      {activeStep === "report-info" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label>Report Type</Label>
                  <RadioGroup value={reportType} onValueChange={setReportType} className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="meeting" id="meeting" />
                      <Label htmlFor="meeting">Meeting Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="informative" id="informative" />
                      <Label htmlFor="informative">Informative Report</Label>
                    </div>
                  </RadioGroup>
                </div>

                {reportType === "meeting" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meeting-name" className="text-lg font-semibold">
                        Meeting Name
                      </Label>
                      <Input
                        id="meeting-name"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)}
                        placeholder="Enter meeting name"
                        className="mt-1 text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="meeting-date">Meeting Date & Time</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !meetingDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {meetingDate ? format(meetingDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={meetingDate} onSelect={setMeetingDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 border rounded-md bg-muted/30">
                  {reportType === "meeting" ? (
                    // Single country selection for meeting reports
                    <>
                      <Label htmlFor="country" className="text-lg font-semibold">
                        Select Country
                      </Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Select value={selectedCountry} onValueChange={handleCountryChange}>
                          <SelectTrigger id="country" className="flex-1">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCountries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                    alt={`${country.name} flag`}
                                    className="h-4 w-6 rounded-sm object-cover"
                                  />
                                  {country.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedCountry && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-md border">
                            <img
                              src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
                              alt={`${getCountryName(selectedCountry)} flag`}
                              className="h-5 w-8 rounded-sm object-cover"
                            />
                            <span className="font-medium">{getCountryName(selectedCountry)}</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Multiple countries selection for informative reports
                    <>
                      <Label className="text-lg font-semibold">Select Countries</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        You can select multiple countries for informative reports
                      </p>
                      <div className="space-y-3 mt-2">
                        {mockCountries.map((country) => (
                          <div key={country.code} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`country-${country.code}`} 
                              checked={selectedCountries.includes(country.code)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCountries([...selectedCountries, country.code]);
                                } else {
                                  setSelectedCountries(selectedCountries.filter(c => c !== country.code));
                                }
                              }}
                            />
                            <Label htmlFor={`country-${country.code}`} className="flex items-center gap-2 cursor-pointer">
                              <img
                                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                alt={`${country.name} flag`}
                                className="h-4 w-6 rounded-sm object-cover"
                              />
                              {country.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {selectedCountries.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedCountries.map(code => (
                            <div key={code} className="flex items-center gap-2 px-3 py-2 bg-background rounded-md border">
                              <img
                                src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                                alt={`${getCountryName(code)} flag`}
                                className="h-5 w-8 rounded-sm object-cover"
                              />
                              <span className="font-medium">{getCountryName(code)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 ml-1"
                                onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== code))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setActiveStep("reports-list")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={reportType === "meeting" ? !selectedCountry : selectedCountries.length === 0}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Profiles - Only for meeting reports */}
      {activeStep === "profiles" && reportType === "meeting" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Meeting Profiles</h2>
            <Button onClick={handleAddProfile}>
              <Plus className="mr-2 h-4 w-4" /> Add Profile
            </Button>
          </div>

          {selectedProfiles.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                {selectedCountry ? (
                  <p>No profiles added yet. Click "Add Profile" to create one.</p>
                ) : (
                  <p>Please select a country first in the Report Info tab.</p>
                )}
              </CardContent>
            </Card>
          ) : (
            selectedProfiles.map((profile, index) => (
              <Card key={profile.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleRemoveProfile(profile.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-24 w-24 rounded-md overflow-hidden bg-muted">
                        {profile.imageUrl ? (
                          <img
                            src={profile.imageUrl || "/placeholder.svg"}
                            alt={profile.fullName || "Profile"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <User className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        id={`image-${profile.id}`}
                        onChange={(e) => handleImageUpload(profile.id, e)}
                        className="w-full text-xs"
                      />
                      <Label htmlFor={`image-${profile.id}`} className="text-xs text-muted-foreground">
                        Upload Portrait
                      </Label>
                    </div>
                    <div className="md:col-span-3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`fullName-${profile.id}`}>Full Name</Label>
                          <Input
                            id={`fullName-${profile.id}`}
                            value={profile.fullName}
                            onChange={(e) => updateProfile(profile.id, "fullName", e.target.value)}
                            placeholder="Enter full name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`position-${profile.id}`}>Position</Label>
                          <Input
                            id={`position-${profile.id}`}
                            value={profile.position}
                            onChange={(e) => updateProfile(profile.id, "position", e.target.value)}
                            placeholder="Enter position"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`type-${profile.id}`}>Profile Type</Label>
                          <Select
                            value={profile.type}
                            onValueChange={(value) => updateProfile(profile.id, "type", value)}
                          >
                            <SelectTrigger id={`type-${profile.id}`} className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ambassador">Ambassador</SelectItem>
                              <SelectItem value="non-ambassador">Non-Ambassador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`education-${profile.id}`}>Education</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateWithAI("profile", profile.id)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? "Generating..." : "Generate with AI"}
                          </Button>
                        </div>
                        <Textarea
                          id={`education-${profile.id}`}
                          value={profile.education}
                          onChange={(e) => updateProfile(profile.id, "education", e.target.value)}
                          placeholder="Education background will be generated by AI"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`overview-${profile.id}`}>Overview</Label>
                        <Textarea
                          id={`overview-${profile.id}`}
                          value={profile.overview}
                          onChange={(e) => updateProfile(profile.id, "overview", e.target.value)}
                          placeholder="Profile overview will be generated by AI"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Country Overview */}
      {activeStep === "country-overview" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Country Overview</h2>
            <Button onClick={() => generateWithAI("country")} disabled={isGenerating || !selectedCountry}>
              {isGenerating ? "Generating..." : "Generate All with AI"}
            </Button>
          </div>

          {!selectedCountry ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Please select a country first in the Report Info tab.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="economic-indicators">Key Economic Indicators</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithAI("economicIndicators")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                  <Textarea
                    id="economic-indicators"
                    value={countryOverview.economicIndicators}
                    onChange={(e) =>
                      setCountryOverview({
                        ...countryOverview,
                        economicIndicators: e.target.value,
                      })
                    }
                    placeholder="Economic indicators will be generated by AI"
                    rows={5}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="country-perception">Country Perception</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithAI("countryPerception")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                  <Textarea
                    id="country-perception"
                    value={countryOverview.countryPerception}
                    onChange={(e) =>
                      setCountryOverview({
                        ...countryOverview,
                        countryPerception: e.target.value,
                      })
                    }
                    placeholder="Country perception will be generated by AI"
                    rows={5}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="trade-sectors">Key Trade Sectors</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithAI("tradeSectors")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                  <Textarea
                    id="trade-sectors"
                    value={countryOverview.tradeSectors}
                    onChange={(e) =>
                      setCountryOverview({
                        ...countryOverview,
                        tradeSectors: e.target.value,
                      })
                    }
                    placeholder="Trade sectors will be generated by AI"
                    rows={5}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="trade-with-usa">Trade with USA</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithAI("tradeWithUSA")}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                  <Textarea
                    id="trade-with-usa"
                    value={countryOverview.tradeWithUSA}
                    onChange={(e) =>
                      setCountryOverview({
                        ...countryOverview,
                        tradeWithUSA: e.target.value,
                      })
                    }
                    placeholder="Trade with USA will be generated by AI"
                    rows={5}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* News & Events - Only for meeting reports */}
      {activeStep === "news-events" && reportType === "meeting" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">News & Events</h2>
            <Button onClick={() => generateWithAI("news")} disabled={isGenerating || !selectedCountry}>
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>

          {!selectedCountry ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Please select a country first in the Report Info tab.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 space-y-2">
                <Label htmlFor="news-events">Latest News & Events (10 Important Items)</Label>
                <Textarea
                  id="news-events"
                  value={newsEvents}
                  onChange={(e) => setNewsEvents(e.target.value)}
                  placeholder="News and events will be generated by AI"
                  rows={10}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Agreements - Only for meeting reports */}
      {activeStep === "agreements" && reportType === "meeting" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Bilateral Agreements with {selectedCountry ? getCountryName(selectedCountry) : ""}
            </h2>
          </div>

          {!selectedCountry ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Please select a country first in the Report Info tab.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {getCountryAgreements(selectedCountry).length > 0 ? (
                <div className="space-y-6">
                  {getCountryAgreements(selectedCountry).map((agreement) => (
                    <Card
                      key={agreement.id}
                      className="overflow-hidden hover:shadow-md transition-shadow dark:hover:bg-gray-800/70"
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">{agreement.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusBadge(agreement.status)}
                                {agreement.type && <Badge variant="outline">{agreement.type}</Badge>}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {agreement.startDate && <div>Start: {agreement.startDate}</div>}
                              {agreement.endDate && <div>End: {agreement.endDate}</div>}
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Latest Update</h4>
                              <span className="text-xs text-muted-foreground">Updated on {agreement.updatedAt}</span>
                            </div>
                            <p className="p-3 bg-muted/30 rounded-md">{agreement.latestUpdate}</p>
                          </div>

                          {agreement.updates && agreement.updates.length > 1 && (
                            <div className="border-t pt-3">
                              <h4 className="font-medium mb-2">Previous Updates</h4>
                              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {agreement.updates.slice(1).map((update) => (
                                  <div key={update.id} className="p-2 bg-muted/20 rounded-md">
                                    <div className="flex justify-between items-start">
                                      <p className="text-sm">{update.text}</p>
                                      <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                        {update.date}
                                      </div>
                                    </div>
                                    {update.author && (
                                      <p className="text-xs text-muted-foreground mt-1">by {update.author}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bilateral agreements found with {getCountryName(selectedCountry)}.</p>
                    <p className="text-sm mt-2">You can add agreements in the Agreements section.</p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                      <a href="/dashboard/agreements" target="_blank" rel="noreferrer">
                        Manage Agreements
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Action Items Selection - Only for meeting reports */}
      {activeStep === "action-items-selection" && reportType === "meeting" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Select Action Items for {selectedCountry ? getCountryName(selectedCountry) : ""}
            </h2>
          </div>

          {!selectedCountry ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Please select a country first in the Report Info tab.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {getCountryActionItems(selectedCountry).length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Select existing action items to include in your report:
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {getCountryActionItems(selectedCountry).map((item) => (
                      <Card
                        key={item.id}
                        className={`cursor-pointer transition-all ${
                          selectedActionItems.includes(item.id)
                            ? "border-primary ring-2 ring-primary/20"
                            : "hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        onClick={() => toggleActionItem(item.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{item.actionItem}</h4>
                            {selectedActionItems.includes(item.id) && <Check className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              className={
                                item.status === "not_started"
                                  ? "bg-gray-500"
                                  : item.status === "in_progress"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                              }
                            >
                              {item.status === "not_started"
                                ? "Not Started"
                                : item.status === "in_progress"
                                  ? "In Progress"
                                  : "Done"}
                            </Badge>
                            <Badge variant="outline">{item.theme}</Badge>
                            {item.industry && <Badge variant="outline">{item.industry}</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                            {item.updates || "No updates"}
                          </p>
                          <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                            <div>Owner: {item.owner}</div>
                            <div>Due: {item.dueDate}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No action items found with {getCountryName(selectedCountry)}.</p>
                    <p className="text-sm mt-2">You can create new action items in the next step.</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Talking Points Selection - Only for meeting reports */}
      {activeStep === "talking-points-selection" && reportType === "meeting" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Select Talking Points for {selectedCountry ? getCountryName(selectedCountry) : ""}
            </h2>
          </div>

          {!selectedCountry ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Please select a country first in the Report Info tab.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Select existing talking points to include in your report:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCountryTalkingPoints(selectedCountry).map((tp) => (
                    <Card
                      key={tp.id}
                      className={`cursor-pointer transition-all ${
                        selectedTalkingPoints.includes(tp.id)
                          ? "border-primary ring-2 ring-primary/20"
                          : "hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => toggleTalkingPoint(tp.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{tp.title}</h4>
                          {selectedTalkingPoints.includes(tp.id) && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{tp.context}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="outline">{tp.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Summary */}
      {activeStep === "summary" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Report Summary</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Report Info</h3>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between">
                      <span>Type</span>
                      <span className="text-muted-foreground capitalize">{reportType}</span>
                    </li>
                    {reportType === "meeting" ? (
                      <>
                        <li className="flex justify-between">
                          <span>Meeting Name</span>
                          <span className="text-muted-foreground">{meetingName || "Not specified"}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Date</span>
                          <span className="text-muted-foreground">
                            {meetingDate ? format(meetingDate, "PPP") : "Not specified"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Country</span>
                          <span className="text-muted-foreground">{getCountryName(selectedCountry)}</span>
                        </li>
                      </>
                    ) : (
                      <li className="flex justify-between">
                        <span>Countries</span>
                        <span className="text-muted-foreground">
                          {selectedCountries.map(code => getCountryName(code)).join(", ")}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {reportType === "meeting" && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium">Profiles</h3>
                      <div className="mt-2">
                        {selectedProfiles.length > 0 ? (
                          <ul className="space-y-1">
                            {selectedProfiles.map((profile) => (
                              <li key={profile.id} className="flex justify-between">
                                <span>{profile.fullName || "Unnamed Profile"}</span>
                                <span className="text-muted-foreground">{profile.position || "No position"}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground">No profiles added</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <h3 className="text-lg font-medium">Country Overview</h3>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between">
                      <span>Economic Indicators</span>
                      <span className="text-muted-foreground">
                        {countryOverview.economicIndicators ? "Completed" : "Not completed"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Country Perception</span>
                      <span className="text-muted-foreground">
                        {countryOverview.countryPerception ? "Completed" : "Not completed"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Trade Sectors</span>
                      <span className="text-muted-foreground">
                        {countryOverview.tradeSectors ? "Completed" : "Not completed"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Trade with USA</span>
                      <span className="text-muted-foreground">
                        {countryOverview.tradeWithUSA ? "Completed" : "Not completed"}
                      </span>
                    </li>
                  </ul>
                </div>

                {reportType === "meeting" && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium">News & Events</h3>
                      <div className="mt-2">
                        <span className="text-muted-foreground">{newsEvents ? "Completed" : "Not completed"}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Action Items</h3>
                      <div className="mt-2">
                        {selectedActionItems.length > 0 ? (
                          <ul className="space-y-1">
                            {selectedActionItems.map((itemId) => {
                              const item = mockActionItems.find((i) => i.id === itemId)
                              return item ? (
                                <li key={item.id} className="flex justify-between">
                                  <span className="truncate max-w-[200px]">{item.actionItem}</span>
                                  <Badge
                                    className={
                                      item.status === "not_started"
                                        ? "bg-gray-500"
                                        : item.status === "in_progress"
                                        ? "bg-blue-500"
                                        : item.status === "done"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }
                                  >
                                    {item.status === "not_started"
                                      ? "Not Started"
                                      : item.status === "in_progress"
                                      ? "In Progress"
                                      : item.status === "done"
                                      ? "Done"
                                      : "Blocked"}
                                  </Badge>
                                </li>
                              ) : null
                            })}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground">No action items selected</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Talking Points</h3>
                      <div className="mt-2">
                        {selectedTalkingPoints.length > 0 ? (
                          <ul className="space-y-1">
                            {selectedTalkingPoints.map((tpId) => {
                              const tp = mockTalkingPoints.find((t) => t.id === tpId)
                              return tp ? (
                                <li key={tp.id} className="flex justify-between">
                                  <span className="truncate max-w-[200px]">{tp.title}</span>
                                  <Badge variant="outline">{tp.category}</Badge>
                                </li>
                              ) : null
                            })}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground">No talking points selected</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between space-x-4">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

