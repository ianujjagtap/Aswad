import {
  LayoutDashboard,
  LogOut,
  Palette,
  QrCode,
  UtensilsCrossed,
  Users,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const isSuperAdmin = session.user.role === "superadmin";

  const navItems = [
    {
      title: "मेनू व्यवस्थापन",
      titleEn: "Menu Management",
      description: "Add, edit, or remove menu items and categories",
      icon: UtensilsCrossed,
      href: "/admin/menu",
      color: "#8B1A1A",
    },
    {
      title: "स्टाइल कस्टमाइझ",
      titleEn: "Customize Style",
      description: "Change background, colors, and fonts",
      icon: Palette,
      href: "/admin/customize",
      color: "#D4A517",
    },
    {
      title: "QR कोड",
      titleEn: "QR Code",
      description: "View and download your menu QR code",
      icon: QrCode,
      href: "/admin/qr",
      color: "#2D6A4F",
    },
  ];

  if (isSuperAdmin) {
    navItems.push(
      {
        title: "शाखा व्यवस्थापन",
        titleEn: "Branch Management",
        description: "Manage all restaurant branches",
        icon: GitBranch,
        href: "/admin/branches",
        color: "#1D3557",
      },
      {
        title: "वापरकर्ते",
        titleEn: "User Management",
        description: "Manage admin accounts",
        icon: Users,
        href: "/admin/users",
        color: "#6B21A8",
      }
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-white to-[#F5E6C8]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[#D4A517]/20 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#8B1A1A]">
              <UtensilsCrossed className="size-5 text-white" />
            </div>
            <div>
              <h1 className="font-[var(--font-devanagari)] text-lg font-bold text-[#8B1A1A]">
                आस्वाद
              </h1>
              <p className="text-xs text-muted-foreground">
                {isSuperAdmin ? "Super Admin" : "Admin"} •{" "}
                {session.user.name}
              </p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <LogOut className="mr-1 size-4" />
              बाहेर पडा
            </Button>
          </form>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2D1810]">
            नमस्कार, {session.user.name} 👋
          </h2>
          <p className="text-muted-foreground">
            Welcome to the Aaswad admin panel
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="border-[#D4A517]/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#8B1A1A]">4</p>
              <p className="text-xs text-muted-foreground">कॅटेगरी</p>
            </CardContent>
          </Card>
          <Card className="border-[#D4A517]/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#8B1A1A]">17</p>
              <p className="text-xs text-muted-foreground">मेनू आयटम्स</p>
            </CardContent>
          </Card>
          <Card className="border-[#D4A517]/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#2D6A4F]">16</p>
              <p className="text-xs text-muted-foreground">उपलब्ध</p>
            </CardContent>
          </Card>
          <Card className="border-[#D4A517]/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-500">1</p>
              <p className="text-xs text-muted-foreground">उपलब्ध नाही</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="group cursor-pointer border-[#D4A517]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <item.icon
                        className="size-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {item.titleEn}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Preview Link */}
        <div className="mt-8 text-center">
          <Link
            href="/menu/aaswad-main"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-[#D4A517]/30 bg-white px-4 py-2 text-sm text-[#8B1A1A] transition-colors hover:bg-[#FFF8E7]"
          >
            <LayoutDashboard className="size-4" />
            मेनू कार्ड पहा • View Menu Card
          </Link>
        </div>
      </main>
    </div>
  );
}
