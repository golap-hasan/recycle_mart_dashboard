/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/tiptap-editor";
import { createOrUpdatePage } from "@/services/legal";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AboutUsFormProps {
  initialData: {
    content: string;
  } | null;
}

export default function AboutUsForm({ initialData }: AboutUsFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    const res = await createOrUpdatePage({
      title: "about-us",
      type: "ABOUT_US",
      content: data.content,
    });

    if (res.success) {
      SuccessToast("About Us content updated successfully!");
    } else {
      ErrorToast(res.message || "Failed to update content");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About Us</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <TiptapEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Content"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
