"use client";

import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative size-20 overflow-hidden rounded-lg border border-border">
            <Image src={value} alt="" fill className="object-cover" sizes="80px" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80"
            >
              <X className="size-3" />
            </button>
          </div>
        ) : (
          <div className="flex size-20 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
            <Upload className="size-5 text-muted-foreground" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
