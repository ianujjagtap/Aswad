"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface SelectBranchButtonProps {
  branchId: string;
  nextPath: string;
}

export function SelectBranchButton({
  branchId,
  nextPath,
}: SelectBranchButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSelect() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/select-branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branchId }),
      });

      if (!res.ok) {
        console.error("Failed to select branch:", await res.text());
        setLoading(false);
        return;
      }

      // Cookie is now confirmed set — navigate to the target page
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      console.error("Branch selection error:", err);
      setLoading(false);
    }
  }

  return (
    <Button type="button" size="sm" onClick={handleSelect} disabled={loading}>
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
      Edit this branch
    </Button>
  );
}
