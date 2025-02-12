"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState} from "react";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog ({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.common_name}</DialogTitle>
          <DialogDescription>
          <div className="mt-2">
          <strong>Scientific Name:</strong> {species.scientific_name}
        </div>
        {species.total_population !== null && (
          <div className="mt-2">
            <strong>Total Population:</strong> {species.total_population.toLocaleString()}
          </div>
        )}
        <div className="mt-1">
          <strong>Animal Kingdom:</strong> {species.kingdom}
        </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-1">
          {species.description}
        </div>
      </DialogContent>
    </Dialog>
  );
}
