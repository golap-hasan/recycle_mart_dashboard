"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  icon: z.string().min(1, "Icon is required").max(2, "Icon must be 1-2 characters"),
  subcategories: z.array(z.string()).min(1, "At least one subcategory is required"),
});

export function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      subcategories: [],
    },
  });

  const subcategories = useWatch({
    control: form.control,
    name: "subcategories",
    defaultValue: [],
  });

  const handleAddSubcategory = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentSubcategory.trim()) {
      const current = form.getValues("subcategories");
      if (!current.includes(currentSubcategory.trim())) {
        form.setValue("subcategories", [...current, currentSubcategory.trim()]);
        setCurrentSubcategory("");
      }
    }
  };

  const handleRemoveSubcategory = (subToRemove: string) => {
    const current = form.getValues("subcategories");
    form.setValue(
      "subcategories",
      current.filter((sub) => sub !== subToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentSubcategory.trim()) {
        const current = form.getValues("subcategories");
        if (!current.includes(currentSubcategory.trim())) {
          form.setValue("subcategories", [...current, currentSubcategory.trim()]);
          setCurrentSubcategory("");
        }
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setOpen(false);
    form.reset();
    setCurrentSubcategory("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-fit">
          <Plus />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category and add its subcategories.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mobiles" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (Emoji)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 📱" maxLength={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Subcategories</FormLabel>
              
              {/* Badges Display */}
              {subcategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {subcategories.map((sub, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {sub}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcategory(sub)}
                        className="ml-2 hover:text-destructive focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Input with Add Button */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type subcategory and press Enter"
                  value={currentSubcategory}
                  onChange={(e) => setCurrentSubcategory(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={handleAddSubcategory}
                  disabled={!currentSubcategory.trim()}
                >
                  Add
                </Button>
              </div>
              {form.formState.errors.subcategories && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.subcategories.message}
                </p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Category
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
