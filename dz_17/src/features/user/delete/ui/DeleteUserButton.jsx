import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import { useDeleteUserMutation } from '../model/deleteUserApi'

export function DeleteUserButton({ userId }) {
    const currentUser = useSelector(selectAuthUser)
    const [deleteUser, { isLoading }] = useDeleteUserMutation()

    if (!currentUser) return null
    if (currentUser.role !== roles.admin) return null

    return (
        <button
            onClick={() => deleteUser(userId)}
            disabled={isLoading}
        >
            {isLoading ? 'Видаляється…' : 'Видалити'}
        </button>
    )
}
