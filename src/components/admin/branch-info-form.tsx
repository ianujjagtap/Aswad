"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { BilingualField } from "@/components/admin/bilingual-field";
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
import { updateBranchInfo } from "@/lib/actions/admin";
import type { BranchMenuData } from "@/lib/types/menu";

export function BranchInfoForm({ data }: { data: BranchMenuData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nameMr: data.nameMr,
    nameEn: data.nameEn,
    taglineMr: data.taglineMr,
    taglineEn: data.taglineEn,
    sinceMr: data.sinceMr,
    sinceEn: data.sinceEn,
    proprietorMr: data.proprietorMr,
    proprietorEn: data.proprietorEn,
    brandLogoText: data.brandLogoText,
    addressMr: data.addressMr,
    addressEn: data.addressEn,
    phone: data.phone,
  });

  async function handleSave() {
    setSaving(true);
    const result = await updateBranchInfo({ branchId: data.id, ...form });
    setSaving(false);
    if (result.success) {
      toast.success("Branch info saved");
      router.refresh();
    }
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Branch Info</h1>
          <p className="text-sm text-muted-foreground">
            Header text shown on the menu card
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save
        </Button>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Brand</CardTitle>
            <CardDescription>Logo area & tagline on menu card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BilingualField
              labelMr="शाखा नाव (मराठी)"
              labelEn="Branch name (English)"
              valueMr={form.nameMr}
              valueEn={form.nameEn}
              onChangeMr={(v) => setForm({ ...form, nameMr: v })}
              onChangeEn={(v) => setForm({ ...form, nameEn: v })}
            />
            <BilingualField
              labelMr="टॅगलाइन (मराठी)"
              labelEn="Tagline (English)"
              valueMr={form.taglineMr}
              valueEn={form.taglineEn}
              onChangeMr={(v) => setForm({ ...form, taglineMr: v })}
              onChangeEn={(v) => setForm({ ...form, taglineEn: v })}
            />
            <div className="space-y-1.5">
              <Label className="text-xs">Logo text (Aaasvaad)</Label>
              <Input
                value={form.brandLogoText}
                onChange={(e) =>
                  setForm({ ...form, brandLogoText: e.target.value })
                }
              />
            </div>
            <BilingualField
              labelMr="Legacy line (मराठी)"
              labelEn="Since / legacy line (English)"
              valueMr={form.sinceMr}
              valueEn={form.sinceEn}
              onChangeMr={(v) => setForm({ ...form, sinceMr: v })}
              onChangeEn={(v) => setForm({ ...form, sinceEn: v })}
            />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BilingualField
              labelMr="मालक / प्रोप्रायटर (मराठी)"
              labelEn="Proprietor (English)"
              valueMr={form.proprietorMr}
              valueEn={form.proprietorEn}
              onChangeMr={(v) => setForm({ ...form, proprietorMr: v })}
              onChangeEn={(v) => setForm({ ...form, proprietorEn: v })}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
