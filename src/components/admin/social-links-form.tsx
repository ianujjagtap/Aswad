"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveSocialLinks } from "@/lib/actions/admin";
import { MAX_SOCIAL_LINKS } from "@/lib/constants";
import { useAdminLanguage } from "@/components/admin/admin-language-provider";
import type { BranchMenuData, SocialLinkData, SocialPlatform } from "@/lib/types/menu";

const PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "zomato", label: "Zomato" },
  { value: "swiggy", label: "Swiggy" },
  { value: "facebook", label: "Facebook" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
  { value: "custom", label: "Custom" },
];

export function SocialLinksForm({
  branchId,
  initialLinks,
}: {
  branchId: string;
  initialLinks: SocialLinkData[];
}) {
  const router = useRouter();
  const [links, setLinks] = useState(initialLinks);
  const [saving, setSaving] = useState(false);
  const { t } = useAdminLanguage();

  function addLink() {
    if (links.length >= MAX_SOCIAL_LINKS) {
      toast.error(`Maximum ${MAX_SOCIAL_LINKS} links. Delete one to add more.`);
      return;
    }
    setLinks([
      ...links,
      {
        id: `temp-${Date.now()}`,
        platform: "custom",
        labelMr: "नवीन लिंक",
        labelEn: "New Link",
        url: "https://",
        displayOrder: links.length,
      },
    ]);
  }

  function updateLink(index: number, patch: Partial<SocialLinkData>) {
    setLinks(links.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  function removeLink(index: number) {
    setLinks(links.filter((_, i) => i !== index));
  }

  async function handleSave() {
    for (const link of links) {
      if (!link.url.startsWith("http")) {
        toast.error("All URLs must start with http:// or https://");
        return;
      }
    }
    setSaving(true);
    const payload = links.map((l, i) => ({
      platform: l.platform,
      labelMr: l.labelMr,
      labelEn: l.labelEn,
      url: l.url,
      displayOrder: i,
    }));
    const result = await saveSocialLinks(branchId, payload);
    setSaving(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Social links saved");
      router.refresh();
    }
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Social & Order Links", "सोशल आणि ऑर्डर लिंक्स")}</h1>
          <p className="text-sm text-muted-foreground">
            {t(`Up to ${MAX_SOCIAL_LINKS} links shown in menu footer`, `मेनूच्या तळाशी जास्तीत जास्त ${MAX_SOCIAL_LINKS} लिंक्स दाखवल्या जातील`)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addLink} disabled={links.length >= MAX_SOCIAL_LINKS}>
            <Plus className="size-4" />
            {t("Add link", "नवीन लिंक जोडा")}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {t("Save", "सेव्ह करा")}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        {links.length === 0 && (
          <Card className="border-dashed border-border/50 bg-card/30">
            <CardContent className="py-10 text-center text-muted-foreground">
              No links yet. Add Instagram, Zomato, Swiggy or custom links.
            </CardContent>
          </Card>
        )}

        {links.map((link, index) => (
          <Card key={link.id} className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Link {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => removeLink(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <CardDescription>Platform & bilingual label</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Platform</Label>
                <Select
                  value={link.platform}
                  onValueChange={(v: SocialPlatform) =>
                    updateLink(index, { platform: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs text-amber-400/80">Label (Marathi)</Label>
                  <Input
                    value={link.labelMr}
                    onChange={(e) =>
                      updateLink(index, { labelMr: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Label (English)</Label>
                  <Input
                    value={link.labelEn}
                    onChange={(e) =>
                      updateLink(index, { labelEn: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(index, { url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
