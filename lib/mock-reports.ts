// Define the report type
export interface Report {
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
  approvedBy?: {
    id: string;
    name: string;
  };
  description?: string;
  tags?: string[];
}

// Mock data for reports
export const mockReports: Report[] = [
  {
    id: "1",
    title: "Japan Trade Relations",
    country: "jp",
    date: "2025-04-15",
    type: "meeting",
    createdAt: "2025-03-01",
    createdBy: {
      id: "user1",
      name: "John Smith",
    },
    approvalStatus: "approved",
    approvedBy: {
      id: "user3",
      name: "Michael Brown",
    },
    description: "Comprehensive overview of trade relations with Japan",
    tags: ["Trade", "Asia", "Technology"],
  },
  {
    id: "2",
    title: "Germany Energy Partnership",
    country: "de",
    date: "2025-04-20",
    type: "meeting",
    createdAt: "2025-03-05",
    createdBy: {
      id: "user2",
      name: "Sarah Johnson",
    },
    approvalStatus: "pending",
    description: "Discussion of renewable energy partnership with Germany",
    tags: ["Energy", "Europe", "Climate"],
  },
  {
    id: "3",
    title: "Brazil Agricultural Trade",
    country: "br",
    date: "2025-05-01",
    type: "meeting",
    createdAt: "2025-03-10",
    createdBy: {
      id: "user4",
      name: "Emily Davis",
    },
    approvalStatus: "approved",
    approvedBy: {
      id: "user3",
      name: "Michael Brown",
    },
    description: "Agricultural trade expansion opportunities with Brazil",
    tags: ["Agriculture", "South America", "Trade"],
  },
  {
    id: "4",
    title: "South Korea Tech Summit",
    country: "kr",
    date: "2025-05-15",
    type: "meeting",
    createdAt: "2025-03-12",
    createdBy: {
      id: "user5",
      name: "David Wilson",
    },
    approvalStatus: "pending",
    description: "Technology summit preparation with South Korea",
    tags: ["Technology", "Asia", "Innovation"],
  },
  {
    id: "5",
    title: "India Investment Opportunities",
    country: "in",
    date: "2025-05-20",
    type: "meeting",
    createdAt: "2025-03-15",
    createdBy: {
      id: "user2",
      name: "Sarah Johnson",
    },
    approvalStatus: "rejected",
    description: "Investment opportunities in India's growing markets",
    tags: ["Investment", "Asia", "Economy"],
  },
];
