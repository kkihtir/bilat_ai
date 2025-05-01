"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Plus, User2, Search, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockProfiles, mockCountries } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";

export default function ProfilesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  // Filter profiles based on search query and selected country
  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter((profile) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || profile.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profiles</h1>
            <p className="mt-1 text-muted-foreground">
              Manage profiles for VIP meetings and diplomatic relations
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/profiles/create">
              <Plus className="mr-2 h-4 w-4" /> Create New Profile
            </Link>
          </Button>
        </div>

        {/* Search, Filter and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
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
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && setView(v as "grid" | "list")}
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Profiles View */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile) => {
              const country = mockCountries.find(
                (c) => c.code === profile.country
              );
              return (
                <Card
                  key={profile.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center text-base font-medium">
                        <div className="flex items-center gap-3">
                          {profile.imageUrl ? (
                            <img
                              src={profile.imageUrl}
                              alt={profile.fullName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <User2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold">
                              {profile.fullName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {profile.position}
                            </div>
                          </div>
                        </div>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mt-2">
                      {country && (
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                            alt={`${country.name} flag`}
                            className="h-4 w-6 rounded-sm object-cover"
                          />
                          <span className="text-sm text-muted-foreground">
                            {country.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/dashboard/profiles/${profile.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => {
                  const country = mockCountries.find(
                    (c) => c.code === profile.country
                  );
                  return (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {profile.imageUrl ? (
                            <img
                              src={profile.imageUrl}
                              alt={profile.fullName}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <User2 className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <span className="font-medium">
                            {profile.fullName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {profile.position}
                      </TableCell>
                      <TableCell>
                        {country && (
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                              alt={`${country.name} flag`}
                              className="h-4 w-6 rounded-sm object-cover"
                            />
                            <span className="text-sm text-muted-foreground">
                              {country.name}
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/profiles/${profile.id}`}>
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
