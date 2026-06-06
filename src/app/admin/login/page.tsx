"use client";

import { Eye, EyeOff, Loader2, UtensilsCrossed } from "lucide-react";
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

import { loginAction } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("लॉगिन यशस्वी!");
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFF8E7] via-[#F5E6C8] to-[#FFF8E7] px-4">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-60 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-[#D4A517]/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-[#D4A517]/20 bg-white/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-[#8B1A1A]">
            <UtensilsCrossed className="size-7 text-white" />
          </div>
          <CardTitle className="font-[var(--font-devanagari)] text-2xl text-[#8B1A1A]">
            आस्वाद
          </CardTitle>
          <CardDescription className="text-[#2D1810]/60">
            Admin Panel • व्यवस्थापक लॉगिन
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ईमेल / Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@aaswad.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड / Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8B1A1A] hover:bg-[#6B1414]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  लॉगिन होत आहे...
                </>
              ) : (
                "लॉगिन करा"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
