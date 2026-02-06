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

interface PrivacyPolicyFormProps {
  initialData: {
    content: string;
  } | null;
}

export default function PrivacyPolicyForm({ initialData }: PrivacyPolicyFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    const res = await createOrUpdatePage({
      title: "privacy-policy",
      type: "PRIVACY_POLICY",
      content: data.content,
    });

    if (res.success) {
      SuccessToast("Privacy Policy content updated successfully!");
    } else {
      ErrorToast(res.message || "Failed to update content");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

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
