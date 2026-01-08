"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Plus, Trash2 } from "lucide-react";
import { createPlan } from "@/services/plans";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  adsLimit: z.number().min(1, "Ads limit must be at least 1"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

export function CreatePackageModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      adsLimit: 10,
      features: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features" as never,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Prepare payload with static values as requested
    const payload = {
      ...values,
      currency: "BDT",
      durationUnit: "MONTH",
      durationValue: 1,
    };

    const res = await createPlan(payload);

    if (res?.success) {
      SuccessToast(res.message);
      setOpen(false);
      form.reset();
      router.refresh();
    } else {
      ErrorToast(res.message || "Something went wrong");
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-fit">
          <Plus />
          Create Package
        </Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Package</DialogTitle>
            <DialogDescription>
              Add a new membership plan with fixed Monthly duration.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pro Plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (BDT)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adsLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ads Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FormLabel>Features</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                    className="h-7 text-xs"
                  >
                    <Plus className="mr-1 h-3 w-3" /> Add Feature
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormControl className="flex-1">
                          <Input placeholder={`Feature ${index + 1}`} {...field} />
                        </FormControl>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 />
                    </Button>
                    <FormMessage />
                  </div>
                ))}
                <div className="text-xs text-muted-foreground">
                  {form.formState.errors.features?.message}
                  {form.formState.errors.features?.root?.message}
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button loading={isLoading} loadingText="Creating..." type="submit" disabled={isLoading}>
                  Create Package
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
    </Dialog>
  );
}
