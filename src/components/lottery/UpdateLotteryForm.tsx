 
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, ErrorToast, SuccessToast } from "@/lib/utils";
import { CalendarIcon, Loader2, Upload } from "lucide-react";
import { format } from "date-fns";
import { updateLottery } from "@/services/lottery";
import { Lottery } from "@/types/lottery.type";

interface UpdateLotteryFormProps {
  lottery: Lottery;
  onSuccess?: () => void;
}

export function UpdateLotteryForm({ lottery, onSuccess }: UpdateLotteryFormProps) {
  const [date, setDate] = useState<Date | undefined>(lottery.drawDate ? new Date(lottery.drawDate) : undefined);
  const [image, setImage] = useState<string | null>(lottery.image);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) {
      ErrorToast("Please select a draw date");
      return;
    }

    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData();
    
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      drawDate: date.toISOString(),
      ticketPrice: Number((form.elements.namedItem("ticketPrice") as HTMLInputElement).value),
      prize: (form.elements.namedItem("prize") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement)?.value || lottery.status,
    };

    formData.append("data", JSON.stringify(data));
    if (imageFile) {
      formData.append("lotteryImage", imageFile);
    }

    const res = await updateLottery(lottery._id, formData);
    
    if (res.success) {
      SuccessToast("Lottery updated successfully!");
      onSuccess?.();
    } else {
      ErrorToast(res.message || "Failed to update lottery");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <Label htmlFor="title">Lottery Title</Label>
          <Input id="title" name="title" defaultValue={lottery.title} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={lottery.description} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticketPrice">Ticket Price (BDT)</Label>
            <Input id="ticketPrice" name="ticketPrice" type="number" defaultValue={lottery.ticketPrice} required />
          </div>
          <div className="space-y-2">
            <Label>Draw Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={lottery.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prize">Prize Details</Label>
          <Input id="prize" name="prize" defaultValue={lottery.prize || ""} placeholder="e.g., 10 Lakh Taka" required />
        </div>

        <div className="space-y-2">
          <Label>Lottery Image</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
          >
            {image ? (
              <div className="relative aspect-video">
                <img
                  src={image}
                  alt="Preview"
                  className="rounded-md object-cover w-full h-full"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setImageFile(null);
                  }}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="py-4">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload lottery image
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Lottery
        </Button>
      </div>
    </form>
  );
}
