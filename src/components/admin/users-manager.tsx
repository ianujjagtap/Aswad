"use client";

import { Loader2, Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser, deleteUser } from "@/lib/actions/admin";
import type { User } from "@/lib/db/schema";

export function UsersManager({ users }: { users: User[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin" as "admin" | "superadmin",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await createUser(form);
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User created");
      setOpen(false);
      router.refresh();
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("Delete this user?")) return;
    const result = await deleteUser(userId);
    if (result.error) toast.error(result.error);
    else {
      toast.success("User deleted");
      router.refresh();
    }
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Superadmin & branch admin accounts
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4" />
              Add user
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create admin account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  minLength={6}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v: "admin" | "superadmin") =>
                    setForm({ ...form, role: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Branch Admin</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-base">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.role === "superadmin" ? "default" : "secondary"}>
                  {user.role}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
