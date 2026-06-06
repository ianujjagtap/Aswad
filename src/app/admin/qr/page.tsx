"use client";

import { ArrowLeft, Copy, Download, QrCode } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QRCodePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    // Build the menu URL based on current origin
    const origin = window.location.origin;
    const url = `${origin}/menu/aaswad-main`;
    setMenuUrl(url);

    // Generate QR code
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 280,
        margin: 2,
        color: {
          dark: "#8B1A1A",
          light: "#FFF8E7",
        },
        errorCorrectionLevel: "H",
      });
    }
  }, []);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    // Create a download canvas with branding
    const downloadCanvas = document.createElement("canvas");
    const ctx = downloadCanvas.getContext("2d");
    if (!ctx) return;

    const padding = 40;
    const qrSize = 280;
    const headerHeight = 80;
    const footerHeight = 50;

    downloadCanvas.width = qrSize + padding * 2;
    downloadCanvas.height =
      qrSize + padding * 2 + headerHeight + footerHeight;

    // Background
    ctx.fillStyle = "#FFF8E7";
    ctx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);

    // Header text
    ctx.fillStyle = "#8B1A1A";
    ctx.font = "bold 28px serif";
    ctx.textAlign = "center";
    ctx.fillText("आस्वाद", downloadCanvas.width / 2, padding + 30);

    ctx.fillStyle = "#D4A517";
    ctx.font = "bold 18px serif";
    ctx.fillText("शाही बिर्याणी", downloadCanvas.width / 2, padding + 58);

    // QR code
    ctx.drawImage(
      canvasRef.current,
      padding,
      padding + headerHeight,
      qrSize,
      qrSize
    );

    // Footer
    ctx.fillStyle = "#2D1810";
    ctx.font = "12px sans-serif";
    ctx.fillText(
      "Scan to view menu",
      downloadCanvas.width / 2,
      padding + headerHeight + qrSize + 30
    );

    // Border
    ctx.strokeStyle = "#D4A517";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, downloadCanvas.width - 20, downloadCanvas.height - 20);

    // Download
    const link = document.createElement("a");
    link.download = "aaswad-menu-qr.png";
    link.href = downloadCanvas.toDataURL("image/png");
    link.click();

    toast.success("QR कोड डाउनलोड झाला!");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(menuUrl);
    toast.success("लिंक कॉपी झाली!");
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
              <h1 className="font-semibold text-[#8B1A1A]">QR कोड</h1>
              <p className="text-xs text-muted-foreground">QR Code</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8">
        <Card className="border-[#D4A517]/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#8B1A1A]/10">
              <QrCode className="size-6 text-[#8B1A1A]" />
            </div>
            <CardTitle>तुमचा मेनू QR कोड</CardTitle>
            <CardDescription>
              Print this QR code and place it on your tables
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {/* QR Code Canvas */}
            <div className="mx-auto mb-6 inline-flex rounded-2xl border-4 border-[#D4A517]/20 bg-[#FFF8E7] p-6 shadow-lg">
              <canvas ref={canvasRef} />
            </div>

            {/* Menu URL */}
            <div className="mb-6 flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
              <code className="flex-1 truncate text-xs">{menuUrl}</code>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={copyUrl}
              >
                <Copy className="size-3.5" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-[#8B1A1A] hover:bg-[#6B1414]"
              >
                <Download className="mr-2 size-4" />
                PNG डाउनलोड करा
              </Button>
              <Link href={menuUrl} target="_blank" className="flex-1">
                <Button variant="outline" className="w-full">
                  मेनू उघडा
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Print Tips */}
        <Card className="mt-4 border-[#D4A517]/20">
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-[#8B1A1A]">
              प्रिंट टिप्स
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• A5 size tent cards work best for table placement</li>
              <li>
                • Use thick paper (200+ GSM) for durability
              </li>
              <li>• Laminate for protection against spills</li>
              <li>
                • Place QR code at eye level when customer is seated
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
