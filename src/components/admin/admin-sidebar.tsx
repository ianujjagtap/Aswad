"use client";

import {
  Building2,
  ExternalLink,
  GitBranch,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Palette,
  QrCode,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  userName: string;
  userRole: string;
  branchName?: string;
  branchSlug?: string;
}

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    labelMr: "डॅशबोर्ड",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/branch",
    label: "Branch Info",
    labelMr: "शाखा माहिती",
    icon: Building2,
  },
  {
    href: "/admin/menu",
    label: "Menu Editor",
    labelMr: "मेनू संपादन",
    icon: UtensilsCrossed,
  },
  {
    href: "/admin/social",
    label: "Social Links",
    labelMr: "सोशल लिंक",
    icon: Link2,
  },
  {
    href: "/admin/customize",
    label: "Style",
    labelMr: "स्टाइल",
    icon: Palette,
  },
  {
    href: "/admin/qr",
    label: "QR Code",
    labelMr: "QR कोड",
    icon: QrCode,
  },
];

const superNavItems = [
  {
    href: "/admin/branches",
    label: "Branches",
    labelMr: "शाखा",
    icon: GitBranch,
  },
  {
    href: "/admin/users",
    label: "Users",
    labelMr: "वापरकर्ते",
    icon: Users,
  },
];

export function AdminSidebar({
  userName,
  userRole,
  branchName,
  branchSlug,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Read role from localStorage (set at login time)
  useEffect(() => {
    const storedRole = localStorage.getItem("admin_role");
    // Use stored role if available, fallback to server-provided role
    const role = storedRole || userRole;
    setIsSuperAdmin(role === "superadmin");
  }, [userRole]);

  const items = isSuperAdmin ? [...navItems, ...superNavItems] : navItems;

  const NavContent = () => (
    <>
      <div className="border-b border-border/50 px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/20 ring-1 ring-primary/30">
            <Image src="/Aaswad-logo.jpeg" alt="Aaswad Logo" fill className="object-cover" />
          </div>
          <div>
            <p className="font-[var(--font-devanagari)] text-lg font-bold text-foreground">
              आस्वाद
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </div>
        {branchName && (
          <div className="mt-4 rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
            <p className="text-xs text-muted-foreground">Editing branch</p>
            <p className="truncate text-sm font-medium">{branchName}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-primary ring-1 ring-primary/20"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-[10px] opacity-60">{item.labelMr}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        {branchSlug && (
          <Link
            href={`/menu/${branchSlug}`}
            target="_blank"
            className="mb-3 flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            Preview menu card
          </Link>
        )}
        <div className="mb-3 px-1">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs capitalize text-muted-foreground">{userRole}</p>
        </div>
        <form
          action={signOutAction}
          onSubmit={() => {
            localStorage.removeItem("admin_role");
          }}
        >
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="mr-2 size-4" />
            Sign out
          </Button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-lg border border-border bg-card p-2 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="size-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col bg-sidebar">
            <button
              type="button"
              className="absolute right-3 top-3 rounded-lg p-1 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </button>
            <NavContent />
          </aside>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/50 bg-sidebar lg:flex">
        <NavContent />
      </aside>
    </>
  );
}
