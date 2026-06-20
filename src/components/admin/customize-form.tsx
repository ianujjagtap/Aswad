"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ImageUpload } from "@/components/admin/image-upload";
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
import { updateMenuConfig } from "@/lib/actions/admin";
import { useAdminLanguage } from "@/components/admin/admin-language-provider";
import type { BranchMenuData } from "@/lib/types/menu";

const FONT_OPTIONS = [
  "Noto Sans Devanagari",
  "Mukta",
  "Yatra One",
  "Rozha One",
];

export function CustomizeForm({ data }: { data: BranchMenuData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState(data.config);
  const { t } = useAdminLanguage();

  async function handleSave() {
    setSaving(true);
    await updateMenuConfig({ branchId: data.id, ...config });
    setSaving(false);
    toast.success("Style saved");
    router.refresh();
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("Style & Theme", "स्टाईल आणि थीम")}</h1>
          <p className="text-sm text-muted-foreground">{t("Colors and background", "रंग आणि पार्श्वभूमी")}</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {t("Save", "सेव्ह करा")}
        </Button>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>{t("Background", "पार्श्वभूमी")}</CardTitle>
            <CardDescription>{t("Optional background image for menu card", "मेनू कार्डसाठी पार्श्वभूमी फोटो (ऐच्छिक)")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              label="Background image"
              value={config.bgImageUrl}
              onChange={(url) => setConfig({ ...config, bgImageUrl: url })}
            />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Brand colors</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[
              { key: "primaryColor" as const, label: "Primary" },
              { key: "secondaryColor" as const, label: "Secondary" },
              { key: "accentColor" as const, label: "Accent" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config[key] ?? "#000000"}
                    onChange={(e) =>
                      setConfig({ ...config, [key]: e.target.value })
                    }
                    className="h-9 w-12 cursor-pointer p-1"
                  />
                  <Input
                    value={config[key] ?? ""}
                    onChange={(e) =>
                      setConfig({ ...config, [key]: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Font</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={config.fontFamily}
              onChange={(e) =>
                setConfig({ ...config, fontFamily: e.target.value })
              }
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
