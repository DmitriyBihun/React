import { DeleteUserButton } from "@/features/user/delete/ui/DeleteUserButton";


export function UserListItem({ user }) {
  return (
    <div>
      <strong>{user.name}</strong> — {user.email} — Роль: {user.role}
      <DeleteUserButton userId={user.id} />
    </div>
  )
}
