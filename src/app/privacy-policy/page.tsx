/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/tiptap-editor";

export default function PrivacyPolicy() {
  const form = useForm({
    defaultValues: {
      content: "<p>Hello World!</p>",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
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
                <FormLabel>Description</FormLabel>
                
                <TiptapEditor 
                  value={field.value || ""} 
                  onChange={field.onChange} 
                />
                
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}