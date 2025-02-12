// Import necessary components and functions
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useState } from "react";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

// Component for deleting a species
export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);

  const onDelete = async () => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    window.location.reload();

    return toast({
      title: "Species deleted!",
      description: "Successfully deleted the species.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" variant="destructive" onClick={() => setOpen(true)}>
          <Icons.trash className="mr-3 h-5 w-5" />
          Delete Species
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Species</DialogTitle>
          <DialogDescription>Are you sure you want to delaete this species?</DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Button
            type="button"
            className="ml-1 mr-1 flex-auto"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onDelete}
          >
            Confirm Delete
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="ml-1 mr-1 flex-auto"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
