import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { normalizeAdminNextPath, requireSuperAdmin } from "@/lib/auth-helpers";
import { setAdminBranch } from "@/lib/actions/admin";
import { getAllBranches, getAllUsers } from "@/lib/db/queries";

export default async function BranchesPage({
  searchParams,
}: {
  searchParams: Promise<{ pick?: string; next?: string }>;
}) {
  await requireSuperAdmin();
  const { pick, next } = await searchParams;
  const nextPath = normalizeAdminNextPath(next);
  const [branches, users] = await Promise.all([
    getAllBranches(),
    getAllUsers(),
  ]);

  async function selectBranch(formData: FormData) {
    "use server";
    const branchId = formData.get("branchId") as string;
    await setAdminBranch(branchId);
    redirect(nextPath);
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Branches</h1>
          <p className="text-sm text-muted-foreground">
            Manage hotel chain locations
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/branches/new">Add branch</Link>
        </Button>
      </div>

      {pick === "1" && (
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="py-4 text-sm">
            Select a branch below to start editing its menu.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {branches.map((branch) => {
          const admin = users.find((u) => u.id === branch.adminId);
          return (
            <Card key={branch.id} className="border-border/50 bg-card/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-(--font-devanagari)">
                      {branch.nameMr}
                    </CardTitle>
                    <CardDescription>{branch.nameEn}</CardDescription>
                  </div>
                  <Badge
                    variant={branch.isActive ? "secondary" : "destructive"}
                  >
                    {branch.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <code className="text-xs text-muted-foreground">
                  /menu/{branch.slug}
                </code>
                <p className="text-xs text-muted-foreground">
                  Admin: {admin?.name ?? "Unassigned"} ({admin?.email ?? "—"})
                </p>
                <div className="flex gap-2">
                  <form action={selectBranch}>
                    <input type="hidden" name="branchId" value={branch.id} />
                    <Button type="submit" size="sm">
                      Edit this branch
                    </Button>
                  </form>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/menu/${branch.slug}`} target="_blank">
                      Preview
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
