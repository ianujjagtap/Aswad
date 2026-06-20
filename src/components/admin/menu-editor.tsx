"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { BilingualField } from "@/components/admin/bilingual-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createCategory,
  createMenuItem,
  createMenuPage,
  deleteCategory,
  deleteMenuItem,
  deleteMenuPage,
  saveFullMenu,
} from "@/lib/actions/admin";
import type { BranchMenuData, MenuPageData } from "@/lib/types/menu";

interface MenuEditorProps {
  branchId: string;
  initialData: BranchMenuData;
}

export function MenuEditor({ branchId, initialData }: MenuEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [activePageId, setActivePageId] = useState(data.pages[0]?.id ?? "");

  const activePage = data.pages.find((p) => p.id === activePageId);

  async function handleSaveAll() {
    setSaving(true);
    const result = await saveFullMenu(branchId, JSON.stringify(data));
    setSaving(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Menu saved successfully");
      router.refresh();
    }
  }

  function updatePage(pageId: string, patch: Partial<MenuPageData>) {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === pageId ? { ...p, ...patch } : p)),
    }));
  }

  function updateCategoryInPage(
    pageId: string,
    categoryId: string,
    side: "left" | "right",
    patch: Partial<MenuPageData["leftColumn"][0]>
  ) {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => {
        if (p.id !== pageId) return p;
        const key = side === "left" ? "leftColumn" : "rightColumn";
        return {
          ...p,
          [key]: p[key].map((c) =>
            c.id === categoryId ? { ...c, ...patch } : c
          ),
        };
      }),
    }));
  }

  function updateItemInPage(
    pageId: string,
    categoryId: string,
    side: "left" | "right",
    itemId: string,
    patch: Partial<MenuPageData["leftColumn"][0]["items"][0]>
  ) {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => {
        if (p.id !== pageId) return p;
        const key = side === "left" ? "leftColumn" : "rightColumn";
        return {
          ...p,
          [key]: p[key].map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  items: c.items.map((item) =>
                    item.id === itemId ? { ...item, ...patch } : item
                  ),
                }
              : c
          ),
        };
      }),
    }));
  }

  async function handleAddPage() {
    const result = await createMenuPage({
      branchId,
      titleMr: "नवीन पान",
      titleEn: "New Page",
      category: "non-veg",
      displayOrder: data.pages.length,
    });
    if (result.id) {
      toast.success("Page created");
      router.refresh();
    }
  }

  async function handleDeletePage(pageId: string) {
    if (!confirm("Delete this menu page and all its content?")) return;
    await deleteMenuPage(pageId, branchId);
    toast.success("Page deleted");
    router.refresh();
  }

  async function handleAddCategory(pageId: string, side: "left" | "right") {
    const page = data.pages.find((p) => p.id === pageId);
    if (!page) return;
    const cols = side === "left" ? page.leftColumn : page.rightColumn;
    const result = await createCategory({
      pageId,
      branchId,
      nameMr: "नवीन श्रेणी",
      nameEn: "New Category",
      columnSide: side,
      displayOrder: cols.length,
    });
    if (result.id) {
      toast.success("Category added");
      router.refresh();
    }
  }

  async function handleAddItem(
    pageId: string,
    categoryId: string,
    side: "left" | "right"
  ) {
    const page = data.pages.find((p) => p.id === pageId);
    const col = page?.[side === "left" ? "leftColumn" : "rightColumn"].find(
      (c) => c.id === categoryId
    );
    const result = await createMenuItem({
      categoryId,
      branchId,
      nameMr: "नवीन पदार्थ",
      nameEn: "New Item",
      price: 100,
      isVeg: false,
      isAvailable: true,
      displayOrder: col?.items.length ?? 0,
    });
    if (result.id) {
      toast.success("Item added");
      router.refresh();
    }
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menu Editor</h1>
          <p className="text-sm text-muted-foreground">
            Edit pages, categories & bilingual dish names
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={saving}>
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save all changes
        </Button>
      </div>

      <Tabs value={activePageId} onValueChange={setActivePageId}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <TabsList className="h-auto flex-wrap bg-muted/30">
            {data.pages.map((page) => (
              <TabsTrigger key={page.id} value={page.id} className="text-xs">
                {page.titleEn}
                <Badge variant="outline" className="ml-1.5 text-[10px]">
                  {page.category}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="outline" size="sm" onClick={handleAddPage}>
            <Plus className="size-4" />
            Add page
          </Button>
        </div>

        {data.pages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Page settings</CardTitle>
                    <CardDescription>Title, images & footer text</CardDescription>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePage(page.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <BilingualField
                  labelMr="पान शीर्षक (मराठी)"
                  labelEn="Page title (English)"
                  valueMr={page.titleMr}
                  valueEn={page.titleEn}
                  onChangeMr={(v) => updatePage(page.id, { titleMr: v })}
                  onChangeEn={(v) => updatePage(page.id, { titleEn: v })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Category type</Label>
                    <Select
                      value={page.category}
                      onValueChange={(v: "veg" | "non-veg") =>
                        updatePage(page.id, { category: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <BilingualField
                  labelMr="खालचा मजकूर (मराठी)"
                  labelEn="Bottom ribbon text (English)"
                  valueMr={page.bottomTextMr ?? ""}
                  valueEn={page.bottomTextEn ?? ""}
                  onChangeMr={(v) => updatePage(page.id, { bottomTextMr: v })}
                  onChangeEn={(v) => updatePage(page.id, { bottomTextEn: v })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUpload
                    label="Food photo 1"
                    value={page.image1Url}
                    onChange={(url) => updatePage(page.id, { image1Url: url })}
                  />
                  <ImageUpload
                    label="Food photo 2"
                    value={page.image2Url}
                    onChange={(url) => updatePage(page.id, { image2Url: url })}
                  />
                </div>
              </CardContent>
            </Card>

            {(["left", "right"] as const).map((side) => {
              const cols = side === "left" ? page.leftColumn : page.rightColumn;
              return (
                <div key={side} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold capitalize">
                      {side} column
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddCategory(page.id, side)}
                    >
                      <Plus className="size-4" />
                      Add category
                    </Button>
                  </div>

                  {cols.map((category) => (
                    <Card
                      key={category.id}
                      className="border-border/50 bg-card/50"
                    >
                      <CardHeader className="pb-3">
                        <BilingualField
                          labelMr="श्रेणी (मराठी)"
                          labelEn="Category (English)"
                          valueMr={category.nameMr}
                          valueEn={category.nameEn}
                          onChangeMr={(v) =>
                            updateCategoryInPage(page.id, category.id, side, {
                              nameMr: v,
                            })
                          }
                          onChangeEn={(v) =>
                            updateCategoryInPage(page.id, category.id, side, {
                              nameEn: v,
                            })
                          }
                        />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border border-border/40 bg-background/40 p-3"
                          >
                            <BilingualField
                              labelMr="पदार्थ (मराठी)"
                              labelEn="Dish name (English)"
                              valueMr={item.nameMr}
                              valueEn={item.nameEn}
                              onChangeMr={(v) =>
                                updateItemInPage(
                                  page.id,
                                  category.id,
                                  side,
                                  item.id,
                                  { nameMr: v }
                                )
                              }
                              onChangeEn={(v) =>
                                updateItemInPage(
                                  page.id,
                                  category.id,
                                  side,
                                  item.id,
                                  { nameEn: v }
                                )
                              }
                            />
                            <div className="mt-3 grid gap-3 sm:grid-cols-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Price (₹)</Label>
                                <Input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) =>
                                    updateItemInPage(
                                      page.id,
                                      category.id,
                                      side,
                                      item.id,
                                      {
                                        price:
                                          Number.parseInt(e.target.value) || 0,
                                      }
                                    )
                                  }
                                />
                              </div>
                              <div className="flex items-end gap-2">
                                <Switch
                                  checked={item.isVeg}
                                  onCheckedChange={(checked) =>
                                    updateItemInPage(
                                      page.id,
                                      category.id,
                                      side,
                                      item.id,
                                      { isVeg: checked }
                                    )
                                  }
                                />
                                <Label className="text-xs">
                                  {item.isVeg ? "Veg" : "Non-veg"}
                                </Label>
                              </div>
                              <div className="flex items-end gap-2">
                                <Switch
                                  checked={item.isAvailable}
                                  onCheckedChange={(checked) =>
                                    updateItemInPage(
                                      page.id,
                                      category.id,
                                      side,
                                      item.id,
                                      { isAvailable: checked }
                                    )
                                  }
                                />
                                <Label className="text-xs">Available</Label>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                onClick={async () => {
                                  await deleteMenuItem(item.id, branchId);
                                  router.refresh();
                                }}
                              >
                                <Trash2 className="size-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-dashed"
                          onClick={() =>
                            handleAddItem(page.id, category.id, side)
                          }
                        >
                          <Plus className="size-4" />
                          Add dish
                        </Button>
                        <Separator />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={async () => {
                            await deleteCategory(category.id, branchId);
                            router.refresh();
                          }}
                        >
                          <Trash2 className="size-4" />
                          Delete category
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
