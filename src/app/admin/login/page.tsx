"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
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
      // Store role in localStorage for sidebar rendering
      if (result?.role) {
        localStorage.setItem("admin_role", result.role);
      }
      toast.success("Login successful");
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="relative mx-auto mb-3 flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-primary/20 ring-1 ring-primary/30">
            <Image src="/Aaswad-logo.jpeg" alt="Aaswad Logo" fill className="object-cover" />
          </div>
          <CardTitle className="font-[var(--font-devanagari)] text-2xl">
            आस्वाद Admin
          </CardTitle>
          <CardDescription>Sign in to manage your menu card</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@aaswad.com"
                required
                autoComplete="email"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="bg-background/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
