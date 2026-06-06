"use client";

import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Save,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { demoBranch } from "@/lib/demo-data";
import type { DemoCategory, DemoMenuItem } from "@/lib/demo-data";

export default function MenuManagementPage() {
  const [categories, setCategories] = useState<DemoCategory[]>(
    demoBranch.categories
  );
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showAddItem, setShowAddItem] = useState<string | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Category handlers ────────────────────────────────────────────────────

  const addCategory = (nameMr: string, nameEn: string) => {
    const newCat: DemoCategory = {
      id: `cat-${Date.now()}`,
      nameMr,
      nameEn,
      items: [],
    };
    setCategories([...categories, newCat]);
    setShowAddCategory(false);
    toast.success("कॅटेगरी जोडली!");
  };

  const updateCategory = (
    catId: string,
    nameMr: string,
    nameEn: string
  ) => {
    setCategories(
      categories.map((c) =>
        c.id === catId ? { ...c, nameMr, nameEn } : c
      )
    );
    setEditingCategory(null);
    toast.success("कॅटेगरी अपडेट झाली!");
  };

  const deleteCategory = (catId: string) => {
    if (!confirm("ही कॅटेगरी आणि सर्व आयटम्स हटवायचे?")) return;
    setCategories(categories.filter((c) => c.id !== catId));
    toast.success("कॅटेगरी हटवली!");
  };

  const moveCategory = (catId: string, direction: "up" | "down") => {
    const idx = categories.findIndex((c) => c.id === catId);
    if (
      (direction === "up" && idx === 0) ||
      (direction === "down" && idx === categories.length - 1)
    )
      return;
    const newCats = [...categories];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newCats[idx], newCats[swapIdx]] = [newCats[swapIdx], newCats[idx]];
    setCategories(newCats);
  };

  // ── Item handlers ────────────────────────────────────────────────────────

  const addItem = (catId: string, item: Omit<DemoMenuItem, "id">) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              items: [
                ...c.items,
                { ...item, id: `item-${Date.now()}` },
              ],
            }
          : c
      )
    );
    setShowAddItem(null);
    toast.success("आयटम जोडला!");
  };

  const updateItem = (catId: string, item: DemoMenuItem) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              items: c.items.map((i) => (i.id === item.id ? item : i)),
            }
          : c
      )
    );
    setEditingItem(null);
    toast.success("आयटम अपडेट झाला!");
  };

  const deleteItem = (catId: string, itemId: string) => {
    if (!confirm("हा आयटम हटवायचा?")) return;
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c
      )
    );
    toast.success("आयटम हटवला!");
  };

  const toggleAvailability = (catId: string, itemId: string) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId
                  ? { ...i, isAvailable: !i.isAvailable }
                  : i
              ),
            }
          : c
      )
    );
  };

  // ── Save all ─────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to DB via API
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("मेनू सेव्ह झाला!");
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
              <h1 className="font-semibold text-[#8B1A1A]">
                मेनू व्यवस्थापन
              </h1>
              <p className="text-xs text-muted-foreground">
                Menu Management
              </p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#8B1A1A] hover:bg-[#6B1414]"
            size="sm"
          >
            {isSaving ? (
              <Loader2 className="mr-1 size-4 animate-spin" />
            ) : (
              <Save className="mr-1 size-4" />
            )}
            सेव्ह करा
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* Categories */}
        {categories.map((category, catIdx) => (
          <Card
            key={category.id}
            className="mb-4 border-[#D4A517]/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {editingCategory === category.id ? (
                  <CategoryEditForm
                    category={category}
                    onSave={(mr, en) =>
                      updateCategory(category.id, mr, en)
                    }
                    onCancel={() => setEditingCategory(null)}
                  />
                ) : (
                  <>
                    <div>
                      <CardTitle className="text-base text-[#8B1A1A]">
                        {category.nameMr}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {category.nameEn} • {category.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => moveCategory(category.id, "up")}
                        disabled={catIdx === 0}
                      >
                        <ChevronUp className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => moveCategory(category.id, "down")}
                        disabled={catIdx === categories.length - 1}
                      >
                        <ChevronDown className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => setEditingCategory(category.id)}
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-red-500"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-2 pt-0">
              {category.items.map((item) => (
                <div key={item.id}>
                  {editingItem === item.id ? (
                    <ItemEditForm
                      item={item}
                      onSave={(updatedItem) =>
                        updateItem(category.id, updatedItem)
                      }
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div
                      className={`flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-[#FFF8E7] ${
                        !item.isAvailable ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            item.isVeg
                              ? "veg-indicator"
                              : "nonveg-indicator"
                          }
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {item.nameMr}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.nameEn}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#8B1A1A]">
                          ₹{item.price}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            toggleAvailability(category.id, item.id)
                          }
                          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                          title={
                            item.isAvailable
                              ? "Mark unavailable"
                              : "Mark available"
                          }
                        >
                          {item.isAvailable ? (
                            <Eye className="size-3.5 text-green-600" />
                          ) : (
                            <EyeOff className="size-3.5 text-red-500" />
                          )}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => setEditingItem(item.id)}
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-red-500"
                          onClick={() => deleteItem(category.id, item.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {showAddItem === category.id ? (
                <ItemAddForm
                  onAdd={(item) => addItem(category.id, item)}
                  onCancel={() => setShowAddItem(null)}
                />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border border-dashed text-muted-foreground"
                  onClick={() => setShowAddItem(category.id)}
                >
                  <Plus className="mr-1 size-4" />
                  आयटम जोडा
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Category */}
        {showAddCategory ? (
          <Card className="border-[#D4A517]/20">
            <CardContent className="p-4">
              <CategoryAddForm
                onAdd={addCategory}
                onCancel={() => setShowAddCategory(false)}
              />
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="w-full border-dashed border-[#D4A517]/40"
            onClick={() => setShowAddCategory(true)}
          >
            <Plus className="mr-2 size-4" />
            नवीन कॅटेगरी जोडा
          </Button>
        )}
      </main>
    </div>
  );
}

// ── Inline Forms ─────────────────────────────────────────────────────────────

function CategoryEditForm({
  category,
  onSave,
  onCancel,
}: {
  category: DemoCategory;
  onSave: (mr: string, en: string) => void;
  onCancel: () => void;
}) {
  const [mr, setMr] = useState(category.nameMr);
  const [en, setEn] = useState(category.nameEn);

  return (
    <div className="flex w-full items-end gap-2">
      <div className="flex-1 space-y-1">
        <Label className="text-xs">मराठी नाव</Label>
        <Input
          value={mr}
          onChange={(e) => setMr(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div className="flex-1 space-y-1">
        <Label className="text-xs">English Name</Label>
        <Input
          value={en}
          onChange={(e) => setEn(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <Button size="sm" className="h-8 bg-[#8B1A1A]" onClick={() => onSave(mr, en)}>
        <Save className="size-3.5" />
      </Button>
      <Button size="sm" variant="ghost" className="h-8" onClick={onCancel}>
        <X className="size-3.5" />
      </Button>
    </div>
  );
}

function CategoryAddForm({
  onAdd,
  onCancel,
}: {
  onAdd: (mr: string, en: string) => void;
  onCancel: () => void;
}) {
  const [mr, setMr] = useState("");
  const [en, setEn] = useState("");

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">नवीन कॅटेगरी</p>
      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <Label className="text-xs">मराठी नाव</Label>
          <Input
            value={mr}
            onChange={(e) => setMr(e.target.value)}
            placeholder="बिर्याणी"
            className="h-8 text-sm"
          />
        </div>
        <div className="flex-1 space-y-1">
          <Label className="text-xs">English Name</Label>
          <Input
            value={en}
            onChange={(e) => setEn(e.target.value)}
            placeholder="Biryani"
            className="h-8 text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          रद्द करा
        </Button>
        <Button
          size="sm"
          className="bg-[#8B1A1A]"
          onClick={() => {
            if (mr && en) onAdd(mr, en);
          }}
          disabled={!mr || !en}
        >
          जोडा
        </Button>
      </div>
    </div>
  );
}

function ItemEditForm({
  item,
  onSave,
  onCancel,
}: {
  item: DemoMenuItem;
  onSave: (item: DemoMenuItem) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(item);

  return (
    <div className="space-y-3 rounded-lg border border-[#D4A517]/30 bg-white p-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">मराठी नाव</Label>
          <Input
            value={data.nameMr}
            onChange={(e) => setData({ ...data, nameMr: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">English Name</Label>
          <Input
            value={data.nameEn}
            onChange={(e) => setData({ ...data, nameEn: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">किंमत (₹)</Label>
          <Input
            type="number"
            value={data.price}
            onChange={(e) =>
              setData({ ...data, price: Number.parseInt(e.target.value) || 0 })
            }
            className="h-8 text-sm"
          />
        </div>
        <div className="flex items-end gap-2 pb-0.5">
          <Switch
            checked={data.isVeg}
            onCheckedChange={(checked) =>
              setData({ ...data, isVeg: checked })
            }
          />
          <Label className="text-xs">{data.isVeg ? "शाकाहारी" : "मांसाहारी"}</Label>
        </div>
        <div className="flex items-end gap-2 pb-0.5">
          <Switch
            checked={data.isAvailable}
            onCheckedChange={(checked) =>
              setData({ ...data, isAvailable: checked })
            }
          />
          <Label className="text-xs">
            {data.isAvailable ? "उपलब्ध" : "अनुपलब्ध"}
          </Label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          रद्द करा
        </Button>
        <Button
          size="sm"
          className="bg-[#8B1A1A]"
          onClick={() => onSave(data)}
        >
          <Save className="mr-1 size-3.5" />
          अपडेट करा
        </Button>
      </div>
    </div>
  );
}

function ItemAddForm({
  onAdd,
  onCancel,
}: {
  onAdd: (item: Omit<DemoMenuItem, "id">) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState({
    nameMr: "",
    nameEn: "",
    price: 0,
    isVeg: false,
    isAvailable: true,
  });

  return (
    <div className="space-y-3 rounded-lg border border-[#D4A517]/30 bg-white p-3">
      <p className="text-sm font-medium text-[#8B1A1A]">नवीन आयटम</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">मराठी नाव</Label>
          <Input
            value={data.nameMr}
            onChange={(e) => setData({ ...data, nameMr: e.target.value })}
            placeholder="चिकन बिर्याणी"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">English Name</Label>
          <Input
            value={data.nameEn}
            onChange={(e) => setData({ ...data, nameEn: e.target.value })}
            placeholder="Chicken Biryani"
            className="h-8 text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">किंमत (₹)</Label>
          <Input
            type="number"
            value={data.price || ""}
            onChange={(e) =>
              setData({ ...data, price: Number.parseInt(e.target.value) || 0 })
            }
            placeholder="250"
            className="h-8 text-sm"
          />
        </div>
        <div className="flex items-end gap-2 pb-0.5">
          <Switch
            checked={data.isVeg}
            onCheckedChange={(checked) =>
              setData({ ...data, isVeg: checked })
            }
          />
          <Label className="text-xs">{data.isVeg ? "शाकाहारी" : "मांसाहारी"}</Label>
        </div>
        <div className="flex items-end gap-2 pb-0.5">
          <Switch
            checked={data.isAvailable}
            onCheckedChange={(checked) =>
              setData({ ...data, isAvailable: checked })
            }
          />
          <Label className="text-xs">उपलब्ध</Label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          रद्द करा
        </Button>
        <Button
          size="sm"
          className="bg-[#8B1A1A]"
          onClick={() => {
            if (data.nameMr && data.nameEn && data.price > 0) onAdd(data);
          }}
          disabled={!data.nameMr || !data.nameEn || data.price <= 0}
        >
          <Plus className="mr-1 size-3.5" />
          जोडा
        </Button>
      </div>
    </div>
  );
}
