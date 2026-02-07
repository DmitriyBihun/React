import { useSelector } from 'react-redux'
import { roles } from '@/shared/config/roles'
import { selectAuthUser } from '@/features/auth'
import { useUpdatePostMutation } from '../model/updatePostApi'

export function EditPostButton({ post, onEdit }) {
    const user = useSelector(selectAuthUser)
    const [updatePost, { isLoading }] = useUpdatePostMutation()

    if (!user) return null

    const canEdit =
        user.role === roles.admin ||
        (user.role === roles.manager && post.authorId === user.id)

    if (!canEdit) return null

    const handleEdit = () => {
        const newTitle = prompt('Новий заголовок', post.title)
        if (!newTitle) return

        updatePost({
            id: post.id,
            data: {
                ...post,
                title: newTitle,
            },
        })
    }

    return (
        <button disabled={isLoading} onClick={handleEdit}>
            Редагувати
        </button>
    )
}
