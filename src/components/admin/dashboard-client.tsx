"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminLanguage } from "@/components/admin/admin-language-provider";
import type { BranchMenuData } from "@/lib/types/menu";

export function DashboardClient({
  sessionName,
  data,
  stats,
}: {
  sessionName: string;
  data: BranchMenuData;
  stats: { pages: number; categories: number; items: number; available: number; unavailable: number };
}) {
  const { t } = useAdminLanguage();

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {t(`Welcome, ${sessionName}`, `स्वागत आहे, ${sessionName}`)}
        </h1>
        <p className="text-muted-foreground">
          {t("Managing", "व्यवस्थापन:")}{" "}
          <span className="font-[var(--font-devanagari)] text-foreground">
            {data.nameMr}
          </span>{" "}
          · /menu/{data.slug}
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t("Menu pages", "मेनू पेजेस"), value: stats.pages },
          { label: t("Categories", "कॅटेगरीज"), value: stats.categories },
          { label: t("Menu items", "मेनू आयटम्स"), value: stats.items },
          { label: t("Available", "उपलब्ध"), value: stats.available },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/50">
            <CardContent className="p-5">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>{t("Quick status", "सद्यस्थिती")}</CardTitle>
            <CardDescription>{t("Live menu overview", "मेनूचा आढावा")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("Social links", "सोशल लिंक्स")}</span>
              <Badge variant="secondary">{data.socialLinks.length} / 4</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("Unavailable items", "अनुपलब्ध आयटम्स")}</span>
              <Badge variant={stats.unavailable > 0 ? "destructive" : "secondary"}>
                {stats.unavailable}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("Branch slug", "ब्रांच लिंक")}</span>
              <code className="rounded bg-muted px-2 py-0.5 text-xs">{data.slug}</code>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>{t("Getting started", "सुरुवात कशी करावी?")}</CardTitle>
            <CardDescription>{t("Edit your digital menu card", "तुमचा डिजिटल मेनू कार्ड अपडेट करा")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{t("1. Update branch header text under Customize", "१. 'Customize' मध्ये जाऊन हॉटेलचे नाव आणि माहिती बदला")}</p>
            <p>{t("2. Edit menu pages, categories & bilingual dish names", "२. 'Menu' मध्ये जाऊन नवीन पदार्थ आणि त्यांच्या किमती सेट करा")}</p>
            <p>{t("3. Configure up to 4 social / order links", "३. 'Social' मध्ये जाऊन तुमच्या हॉटेलच्या लिंक्स (Instagram/Zomato) टाका")}</p>
            <p>{t("4. Download QR code for customers to scan", "४. 'QR Code' वरून नवीन क्यूआर कोड डाउनलोड करा आणि प्रिंट करा")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
