"use client";

import { ArrowLeft, Copy, Download, QrCode } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

import { useAdminLanguage } from "@/components/admin/admin-language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QRCodeClient({
  slug,
  branchName,
}: {
  slug: string;
  branchName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const { t } = useAdminLanguage();

  const menuUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/menu/${slug}`
      : `/menu/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    toast.success("URL copied");
  };

  const handleDownload = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    const size = 512;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // fill background first (handles transparent SVGs)
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = `${slug}-menu-qr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success(t("QR downloaded", "QR डाउनलोड झाला"));
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 size-4" />
          {t("Back", "मागे जा")}
        </Link>
        <h1 className="text-2xl font-bold">
          {t("QR Code", "क्यूआर कोड (QR Code)")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t(
            `Scan to open ${branchName} menu`,
            `${branchName} मेनू उघडण्यासाठी स्कॅन करा`,
          )}
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="size-5 text-primary" />
              {t("Menu QR", "मेनूचा क्यूआर")}
            </CardTitle>
            <CardDescription>/menu/{slug}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="rounded-xl border border-border/50 bg-background p-4">
              <div ref={containerRef}>
                <QRCode
                  value={menuUrl}
                  size={256}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                />
              </div>
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-xs font-medium">
                  {t("Foreground", "अक्षराचा रंग")}
                </label>
                <div className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="size-5 cursor-pointer appearance-none rounded border-0 p-0"
                  />
                  <span className="text-xs uppercase text-muted-foreground">
                    {fgColor}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-xs font-medium">
                  {t("Background", "पार्श्वभूमी रंग")}
                </label>
                <div className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="size-5 cursor-pointer appearance-none rounded border-0 p-0"
                  />
                  <span className="text-xs uppercase text-muted-foreground">
                    {bgColor}
                  </span>
                </div>
              </div>
            </div>

            <code className="break-all rounded-lg bg-muted px-3 py-2 text-xs">
              {menuUrl}
            </code>

            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={handleCopy}>
                <Copy className="size-4" />
                {t("Copy URL", "लिंक कॉपी करा")}
              </Button>
              <Button className="flex-1" onClick={handleDownload}>
                <Download className="size-4" />
                {t("Download", "डाउनलोड")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
