"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { BilingualField } from "@/components/admin/bilingual-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBranch } from "@/lib/actions/admin";

export default function NewBranchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    nameMr: "",
    nameEn: "",
    phone: "",
    addressMr: "",
    addressEn: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await createBranch(form);
    setLoading(false);
    if (result.error) {
      toast.error(String(result.error));
    } else {
      toast.success("Branch created");
      router.push("/admin/branches");
    }
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6">
        <Link href="/admin/branches" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to branches
        </Link>
        <h1 className="mt-2 text-2xl font-bold">New Branch</h1>
      </div>

      <Card className="mx-auto max-w-lg border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Branch details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">URL slug (lowercase, hyphens only)</Label>
              <Input
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value.toLowerCase() })
                }
                placeholder="aaswad-chinchwad"
                required
              />
            </div>
            <BilingualField
              labelMr="शाखा नाव (मराठी)"
              labelEn="Branch name (English)"
              valueMr={form.nameMr}
              valueEn={form.nameEn}
              onChangeMr={(v) => setForm({ ...form, nameMr: v })}
              onChangeEn={(v) => setForm({ ...form, nameEn: v })}
            />
            <BilingualField
              labelMr="पत्ता (मराठी)"
              labelEn="Address (English)"
              valueMr={form.addressMr}
              valueEn={form.addressEn}
              onChangeMr={(v) => setForm({ ...form, addressMr: v })}
              onChangeEn={(v) => setForm({ ...form, addressEn: v })}
            />
            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              Create branch
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
