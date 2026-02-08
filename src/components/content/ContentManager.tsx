/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Image as ImageIcon, Link as LinkIcon, MessageSquare, Save, ChevronRight, Plus, Trash2, Sparkles } from "lucide-react";
import { upsertExtraData, updateExtraLink, updateExtraHeading } from "@/services/extra-data";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface ExtraData {
  adImage1?: string;
  adImage2?: string;
  adImage3?: string;
  adImage4?: string;
  adImage5?: string;
  adImage6?: string;
  adImage7?: string;
  link1?: string;
  link2?: string;
  heading?: string[];
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
  const [updatingLink, setUpdatingLink] = useState<string | null>(null);
  const [updatingHeading, setUpdatingHeading] = useState(false);
  const [headings, setHeadings] = useState<string[]>(initialData.heading || []);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev % 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide headings preview
  useEffect(() => {
    if (headings.length === 0) return;
    const interval = setInterval(() => {
      setActiveHeadingIndex((prev) => (prev + 1) % headings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headings.length]);

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

  const handleLinkUpdate = async (key: string, value: string) => {
    setUpdatingLink(key);
    try {
      const res = await updateExtraLink(key, value);
      if (res.success) {
        SuccessToast(`${key} updated successfully!`);
        setData((prev) => ({ ...prev, [key]: value }));
      } else {
        ErrorToast(res.message || "Failed to update link");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setUpdatingLink(null);
    }
  };

  const handleHeadingUpdate = async () => {
    // Filter out empty strings before saving
    const filteredHeadings = headings.filter(h => h.trim() !== "");
    if (filteredHeadings.length === 0) {
      ErrorToast("Please add at least one notice");
      return;
    }

    setUpdatingHeading(true);
    try {
      const res = await updateExtraHeading(filteredHeadings);
      if (res.success) {
        SuccessToast("Notices updated successfully!");
        setData((prev) => ({ ...prev, heading: filteredHeadings }));
        setHeadings(filteredHeadings);
      } else {
        ErrorToast(res.message || "Failed to update notices");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setUpdatingHeading(false);
    }
  };

  const addHeading = () => {
    setHeadings([...headings, ""]);
  };

  const removeHeading = (index: number) => {
    const newHeadings = headings.filter((_, i) => i !== index);
    setHeadings(newHeadings);
    if (activeHeadingIndex >= newHeadings.length) {
      setActiveHeadingIndex(0);
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
    <div className="space-y-8 pb-20">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Top Navbar Notices Editor */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Top Navbar Notices (Scrolling)
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addHeading}
              className="h-8 gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Notice
            </Button>
          </div>
          <Button 
            onClick={handleHeadingUpdate} 
            disabled={updatingHeading}
            size="sm"
            className="gap-2"
          >
            {updatingHeading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save All Notices
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 overflow-hidden">
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {headings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto opacity-20 mb-2" />
                  <p className="text-sm">No notices added yet.</p>
                  <Button variant="link" onClick={addHeading}>Click here to add one</Button>
                </div>
              ) : (
                headings.map((heading, idx) => (
                  <div key={idx} className="flex items-end gap-2 group animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        Notice {idx + 1}
                      </Label>
                      <Input 
                        placeholder={`Enter notice message ${idx + 1}...`}
                        value={heading}
                        onChange={(e) => {
                          const newHeadings = [...headings];
                          newHeadings[idx] = e.target.value;
                          setHeadings(newHeadings);
                        }}
                        className="h-9 focus-visible:ring-primary"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeHeading(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Notice Preview */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-primary text-primary-foreground py-2 px-4 rounded-lg shadow-lg relative overflow-hidden h-12 flex items-center justify-center">
              {headings.length > 0 ? (
                <div 
                  key={activeHeadingIndex}
                  className="flex items-center gap-2 animate-in slide-in-from-right fade-in duration-500"
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium">
                    {headings[activeHeadingIndex] || "Empty notice message..."}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </div>
              ) : (
                <span className="text-sm opacity-50 italic">No active notices</span>
              )}
              {headings.length > 0 && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-4000 ease-linear" style={{ width: '100%' }} key={`progress-${activeHeadingIndex}`} />
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center italic">
              * This is a live preview of how notices will cycle on the website navbar.
            </p>
          </div>
        </div>
      </section>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[6, 7].map((num) => (
            <div key={`adImage${num}`} className="space-y-4">
              <ImageCard
                id={`adImage${num}`}
                label={`Ad Banner ${num === 6 ? 'A' : 'B'}`}
                currentImage={(data as any)[`adImage${num}`]}
              />
              <Card className="p-4 border-dashed border-2">
                <div className="space-y-2">
                  <Label className="text-xs font-medium flex items-center gap-2">
                    <LinkIcon className="h-3 w-3" />
                    Ad Link (Click Destination)
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="https://example.com/product"
                      defaultValue={(data as any)[`link${num - 5}`]}
                      id={`link-input-${num}`}
                    />
                    <Button 
                      size="sm"
                      onClick={() => {
                        const val = (document.getElementById(`link-input-${num}`) as HTMLInputElement).value;
                        handleLinkUpdate(`link${num - 5}`, val);
                      }}
                      disabled={updatingLink === `link${num - 5}`}
                    >
                      {updatingLink === `link${num - 5}` ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
