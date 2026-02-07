/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { upsertExtraData } from "@/services/extra-data";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface ExtraData {
  adImage1?: string;
  adImage2?: string;
  adImage3?: string;
  adImage4?: string;
  adImage5?: string;
  adImage6?: string;
  adImage7?: string;
}

interface ContentManagerProps {
  initialData: ExtraData;
}

export function ContentManager({ initialData }: ContentManagerProps) {
  const [data, setData] = useState<ExtraData>(initialData);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(1);

  // Auto-slide preview
  useState(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev % 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeKey) return;

    setUploadingKey(activeKey);
    const formData = new FormData();
    formData.append("adImage", file);
    formData.append("data", JSON.stringify({ imageKey: activeKey }));

    try {
      const res = await upsertExtraData(formData);
      if (res.success) {
        SuccessToast(`${activeKey} updated successfully!`);
        setData(res.data);
      } else {
        ErrorToast(res.message || "Failed to update image");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setUploadingKey(null);
      setActiveKey(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerUpload = (key: string) => {
    setActiveKey(key);
    fileInputRef.current?.click();
  };

  const ImageCard = ({ id, label, currentImage }: { id: string; label: string; currentImage?: string }) => (
    <Card className="p-0 overflow-hidden group relative">
      <CardHeader className="p-3 bg-muted/50 border-b">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={label}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center gap-2">
              <ImageIcon className="h-8 w-8 opacity-20" />
              <span className="text-xs">No image uploaded</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-8"
              onClick={() => triggerUpload(id)}
              disabled={uploadingKey === id}
            >
              {uploadingKey === id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Update
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Website Layout Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Live Preview (Website Layout)
          </h2>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full animate-pulse">
            Live View
          </span>
        </div>
        
        <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[500px]">
          {/* Main Carousel Preview */}
          <div className="col-span-8 relative rounded-2xl overflow-hidden bg-muted group border-2 border-primary/20">
            <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
              Carousel {currentCarouselIndex}/5
            </div>
            {(data as any)[`adImage${currentCarouselIndex}`] ? (
              <Image
                src={(data as any)[`adImage${currentCarouselIndex}`]}
                alt="Carousel Preview"
                fill
                className="object-cover transition-opacity duration-500"
                key={currentCarouselIndex}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 opacity-20" />
                <span className="text-sm">No Carousel Image {currentCarouselIndex}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button size="sm" onClick={() => triggerUpload(`adImage${currentCarouselIndex}`)}>
                Change Slide {currentCarouselIndex}
              </Button>
            </div>
          </div>

          {/* Side Ads Preview */}
          <div className="col-span-4 flex flex-col gap-4">
            {[6, 7].map((num) => (
              <div key={num} className="flex-1 relative rounded-2xl overflow-hidden bg-muted group border-2 border-primary/20">
                <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                  Ad Banner {num === 6 ? 'A' : 'B'}
                </div>
                {(data as any)[`adImage${num}`] ? (
                  <Image
                    src={(data as any)[`adImage${num}`]}
                    alt={`Ad ${num}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="h-7 text-[10px]" onClick={() => triggerUpload(`adImage${num}`)}>
                    Change Ad {num === 6 ? 'A' : 'B'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1-5</span>
            Homepage Carousel Banners
          </h2>
          <p className="text-sm text-muted-foreground italic">Recommended size: 1920x600px</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <ImageCard
              key={`adImage${num}`}
              id={`adImage${num}`}
              label={`Carousel Slide ${num}`}
              currentImage={(data as any)[`adImage${num}`]}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">6-7</span>
            Advertisement Sections
          </h2>
          <p className="text-sm text-muted-foreground italic">Recommended size: 400x400px</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[6, 7].map((num) => (
            <ImageCard
              key={`adImage${num}`}
              id={`adImage${num}`}
              label={`Ad Banner ${num === 6 ? 'A' : 'B'}`}
              currentImage={(data as any)[`adImage${num}`]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
