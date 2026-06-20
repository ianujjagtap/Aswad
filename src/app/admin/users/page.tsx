import { redirect } from "next/navigation";

import { UsersManager } from "@/components/admin/users-manager";
import { requireSuperAdmin } from "@/lib/auth-helpers";
import { getAllUsers } from "@/lib/db/queries";

export default async function UsersPage() {
  await requireSuperAdmin();
  const users = await getAllUsers();
  return <UsersManager users={users} />;
}
