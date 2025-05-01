"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: string[];
  summary: string;
  profileId: string;
}

interface ProfileReport {
  id: string;
  title: string;
  date: string;
  type: string;
  profileId: string;
  status: "pending" | "approved" | "rejected";
}

interface Profile {
  id: string;
  fullName: string;
  title: string;
  country: string;
  education?: string;
  overview?: string;
  imageUrl?: string;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

export default function CountryManager() {
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const generateProfileWithAI = async (
    section?: "education" | "overview" | "image" | "all"
  ) => {
    if (!editingProfile) return;

    try {
      setIsGeneratingWithAI(true);

      const promptContent = `Please help me create a profile for ${editingProfile.fullName}, who is a ${editingProfile.title} from ${editingProfile.country}.

Please search Wikipedia and provide:
1. A comprehensive education history
2. A professional overview and background
3. Look specifically for the image in the Wikipedia infobox vCard (the information box on the right side with biographical information)
4. Get the DIRECT, FULL-RESOLUTION image URL for the first image on the vcard info box.
5. The URL should look like: https://upload.wikimedia.org/wikipedia/commons/HASH/HASH/File:NAME.jpg

IMPORTANT NOTES:
- If you can't find the exact person, look for someone with a similar name or position
- NEVER return a placeholder or tell me you can't find an image
- If you can't find the exact person on Wikipedia, try looking for their image on official government websites or news sites`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content:
                  "You are a diplomatic affairs assistant helping to create profiles for diplomats and government officials.",
              },
              {
                role: "user",
                content: promptContent,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      // ... rest of the function implementation
    } catch (error) {
      console.error("Error generating profile with AI:", error);
      toast({
        title: "Generation failed",
        description:
          "Failed to generate profile information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  // ... rest of the component implementation
}
