"use client";

import {
  ArrowLeft,
  Loader2,
  Palette,
  Save,
  Type,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { demoBranch } from "@/lib/demo-data";

const FONT_OPTIONS = [
  { value: "Noto Sans Devanagari", label: "Noto Sans Devanagari (Default)" },
  { value: "Tiro Devanagari Hindi", label: "Tiro Devanagari Hindi" },
  { value: "Mukta", label: "Mukta" },
  { value: "Poppins", label: "Poppins" },
  { value: "Baloo 2", label: "Baloo 2" },
];

export default function CustomizePage() {
  const [config, setConfig] = useState(demoBranch.config);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to DB via API
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("स्टाइल सेव्ह झाली!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-white to-[#F5E6C8]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#D4A517]/20 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="size-8">
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold text-[#8B1A1A]">
                स्टाइल कस्टमाइझ
              </h1>
              <p className="text-xs text-muted-foreground">
                Customize Style
              </p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#8B1A1A] hover:bg-[#6B1414]"
            size="sm"
          >
            {isSaving ? (
              <Loader2 className="mr-1 size-4 animate-spin" />
            ) : (
              <Save className="mr-1 size-4" />
            )}
            सेव्ह करा
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Background Image */}
          <Card className="border-[#D4A517]/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="size-4 text-[#8B1A1A]" />
                बॅकग्राउंड इमेज
              </CardTitle>
              <CardDescription>
                Upload a background image for your menu card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div
                  className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#D4A517]/40 bg-[#FFF8E7]"
                  style={{
                    backgroundImage: config.bgImageUrl
                      ? `url(${config.bgImageUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!config.bgImageUrl && (
                    <div className="text-center text-sm text-muted-foreground">
                      <Upload className="mx-auto mb-1 size-6" />
                      <p>Click to upload or drag & drop</p>
                      <p className="text-xs">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              <Input
                type="file"
                accept="image/*"
                className="mt-3"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // TODO: Upload to Vercel Blob
                    const url = URL.createObjectURL(file);
                    setConfig({ ...config, bgImageUrl: url });
                    toast.info("Preview only — save to upload");
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Colors */}
          <Card className="border-[#D4A517]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Palette className="size-4 text-[#D4A517]" />
                रंग / Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">मुख्य रंग (Primary)</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) =>
                      setConfig({ ...config, primaryColor: e.target.value })
                    }
                    className="size-8 cursor-pointer rounded border"
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) =>
                      setConfig({ ...config, primaryColor: e.target.value })
                    }
                    className="h-8 flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">दुय्यम रंग (Secondary)</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="size-8 cursor-pointer rounded border"
                  />
                  <Input
                    value={config.secondaryColor}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="h-8 flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">पार्श्वभूमी रंग (Background)</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) =>
                      setConfig({ ...config, accentColor: e.target.value })
                    }
                    className="size-8 cursor-pointer rounded border"
                  />
                  <Input
                    value={config.accentColor}
                    onChange={(e) =>
                      setConfig({ ...config, accentColor: e.target.value })
                    }
                    className="h-8 flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Font */}
          <Card className="border-[#D4A517]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Type className="size-4 text-[#2D6A4F]" />
                फॉन्ट / Font
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.value}
                    type="button"
                    onClick={() =>
                      setConfig({ ...config, fontFamily: font.value })
                    }
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      config.fontFamily === font.value
                        ? "border-[#8B1A1A] bg-[#8B1A1A]/5"
                        : "border-[#D4A517]/20 hover:border-[#D4A517]/50"
                    }`}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </p>
                    <p
                      className="mt-1 text-xs text-muted-foreground"
                      style={{ fontFamily: font.value }}
                    >
                      आस्वाद शाही बिर्याणी - ₹250
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border-[#D4A517]/20 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">प्रिव्ह्यू / Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="mx-auto max-w-sm overflow-hidden rounded-xl border shadow-lg"
                style={{
                  backgroundColor: config.accentColor,
                  fontFamily: `"${config.fontFamily}", sans-serif`,
                }}
              >
                <div className="p-6 text-center">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: config.primaryColor }}
                  >
                    आस्वाद
                  </h3>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: config.secondaryColor }}
                  >
                    शाही बिर्याणी
                  </p>
                  <Separator className="my-3" />
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: config.primaryColor }}
                      >
                        चिकन बिर्याणी
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: config.primaryColor }}
                      >
                        ₹250
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: config.primaryColor }}
                      >
                        वेज बिर्याणी
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: config.primaryColor }}
                      >
                        ₹200
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
