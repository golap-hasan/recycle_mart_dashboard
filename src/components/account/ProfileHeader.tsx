/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Check, X } from "lucide-react";
import { getCurrentUser, updateProfilePhoto } from "@/services/auth";
import { User } from "@/types/users.type";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { format } from "date-fns";

export function ProfileHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelUpload = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("user", selectedFile);

    try {
      const res = await updateProfilePhoto(formData);
      if (res.success) {
        SuccessToast("Profile photo updated successfully!");
        const userData = await getCurrentUser();
        setUser(userData);
        handleCancelUpload();
      } else {
        ErrorToast(res.message || "Failed to update profile photo");
      }
    } catch (error: any) {
      ErrorToast(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src={previewImage || user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          {!previewImage && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm"
              onClick={handleImageClick}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {previewImage && !isLoading && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 rounded-full p-0 text-destructive border-destructive/50 hover:bg-destructive/10"
              onClick={handleCancelUpload}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="h-8 w-8 rounded-full p-0 bg-green-600 hover:bg-green-700"
              onClick={handleConfirmUpload}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" />
            Updating...
          </div>
        )}
      </div>
      
      <div className="flex-1 text-center md:text-left space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
          <Badge variant="secondary" className="capitalize">
            {user?.role?.replace('_', ' ').toLowerCase() || "Admin"}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your personal information and security settings.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
          {user?.createdAt && (
            <span>Member since {format(new Date(user.createdAt), "MMM yyyy")}</span>
          )}
          <span>•</span>
          <span>Admin Panel</span>
        </div>
      </div>
    </div>
  );
}
