import { CreateUserForm } from "@/features/user/create/ui/CreateUserForm";
import { UserList } from "@/widgets/userList/UserList";


export default function UsersPage() {
  return (
    <div>
      <h1>Користувачі</h1>
      <CreateUserForm />
      <UserList />
    </div>
  )
}