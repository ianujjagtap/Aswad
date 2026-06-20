import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminBranchId, requireAuth } from "@/lib/auth-helpers";
import { getBranchMenuData, getBranchStats } from "@/lib/db/queries";

export default async function DashboardPage() {
  const session = await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId && session.user.role === "superadmin") {
    redirect("/admin/branches?pick=1");
  }

  if (!branchId) redirect("/admin/login");

  const [data, stats] = await Promise.all([
    getBranchMenuData(branchId),
    getBranchStats(branchId),
  ]);

  if (!data) redirect("/admin/branches");

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome, {session.user.name}
        </h1>
        <p className="text-muted-foreground">
          Managing{" "}
          <span className="font-[var(--font-devanagari)] text-foreground">
            {data.nameMr}
          </span>{" "}
          · /menu/{data.slug}
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Menu pages", value: stats.pages },
          { label: "Categories", value: stats.categories },
          { label: "Menu items", value: stats.items },
          { label: "Available", value: stats.available },
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
            <CardTitle>Quick status</CardTitle>
            <CardDescription>Live menu overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Social links</span>
              <Badge variant="secondary">{data.socialLinks.length} / 4</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Unavailable items</span>
              <Badge variant={stats.unavailable > 0 ? "destructive" : "secondary"}>
                {stats.unavailable}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Branch slug</span>
              <code className="rounded bg-muted px-2 py-0.5 text-xs">{data.slug}</code>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>Edit your digital menu card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Update branch header text under Branch Info</p>
            <p>2. Edit menu pages, categories & bilingual dish names</p>
            <p>3. Configure up to 4 social / order links</p>
            <p>4. Download QR code for customers to scan</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
