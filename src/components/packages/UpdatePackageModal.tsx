"use client";

import { useEffect, useState } from "react";
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
import { Edit, Plus, Trash2 } from "lucide-react";
import { updatePlan } from "@/services/plans";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Plan } from "@/types/plan.types";
import { DialogTrigger } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(1, "Package name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

interface UpdatePackageModalProps {
  plan: Plan;
}

export function UpdatePackageModal({ plan }: UpdatePackageModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      features: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "features" as never,
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        price: plan.price,
      });
      replace(plan.features); // Populate field array
    }
  }, [plan, form, replace]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const res = await updatePlan(plan._id, values);

    if (res?.success) {
      SuccessToast(res.message);
      setOpen(false);
      router.refresh();
    } else {
      ErrorToast(res.message || "Something went wrong");
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Package</DialogTitle>
          <DialogDescription>
            Update plan details. Pricing and features can be modified.
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
              <Button loading={isLoading} loadingText="Saving..." type="submit" disabled={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
