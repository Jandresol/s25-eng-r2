'use client'
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SpeciesCard from "./species-card";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SearchSpecies({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [allSpecies, setAllSpecies] = useState<Species[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      const supabase = createBrowserSupabaseClient();
      try {
        const { data } = await supabase.from("species").select("*").order("id", { ascending: false });
        setAllSpecies(data ?? []);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching species:", error);
      }
    };

    void fetchSpecies();
  }, [sessionId]);

  useEffect(() => {
    const fetchFilteredSpecies = async () => {
      // Fetch data based on searchQuery, similar to how you fetch allSpecies
      // Adjust the query based on your specific requirements
    };

    void fetchFilteredSpecies();
  }, [searchQuery]);

  return (
    <>
      <div className="mb-5 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery ?? ""}
          onChange={(e) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set("search", e.target.value);
            router.push(`${pathname}?${newSearchParams.toString()}`);
          }}
          className="border p-2"
        />
      </div>
      <div className="flex flex-wrap justify-center">
      {allSpecies
        .filter((species) => {
          const query = searchQuery?.toLowerCase() ?? ""; // Normalize the search query
          return (
            species.scientific_name.toLowerCase().includes(query) ?? // Filter by scientific name
            (species.common_name && species.common_name.toLowerCase().includes(query)) ?? // Filter by common name (if not null)
            (species.description && species.description.toLowerCase().includes(query)) // Filter by description (if exists)
          );
        })
        .map((species) => (
          <SpeciesCard key={species.id} species={species} userId={sessionId} />
        ))}
      </div>
    </>
  );
}
