"use client";

import { ArrowLeft, Copy, Download, QrCode } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";
import { toast } from "sonner";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}/menu/${slug}`;
    setMenuUrl(url);

    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, url, {
        width: 280,
        margin: 2,
        color: { dark: "#8B1A1A", light: "#1a1a1a" },
        errorCorrectionLevel: "H",
      });
    }
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    toast.success("URL copied");
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${slug}-menu-qr.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("QR downloaded");
  };

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 size-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">QR Code</h1>
        <p className="text-sm text-muted-foreground">
          Scan to open {branchName} menu
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="size-5 text-primary" />
              Menu QR
            </CardTitle>
            <CardDescription>/menu/{slug}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="rounded-xl border border-border/50 bg-background p-4">
              <canvas ref={canvasRef} />
            </div>
            <code className="break-all rounded-lg bg-muted px-3 py-2 text-xs">
              {menuUrl}
            </code>
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={handleCopy}>
                <Copy className="size-4" />
                Copy URL
              </Button>
              <Button className="flex-1" onClick={handleDownload}>
                <Download className="size-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
