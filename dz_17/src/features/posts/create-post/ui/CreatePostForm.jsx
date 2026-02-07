import { useSelector } from "react-redux"
import { useCreatePostMutation } from "../model/createPostApi"
import { useState } from "react"
import { roles } from "@/shared/config/roles"
import { selectAuthUser } from "@/features/auth"

export function CreatePostForm() {
    const user = useSelector(selectAuthUser)
    const [createPost, { isLoading }] = useCreatePostMutation()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    if (!user) return null

    const canCreate =
        user.role === roles.admin || user.role === roles.manager

    if (!canCreate) return null

    const handleSubmit = (e) => {
        e.preventDefault()

        createPost({
            title,
            content,
            authorId: user.id,
        })

        setTitle('')
        setContent('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Новий пост</h3>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Контент" />

            <button type="submit" disabled={isLoading}>
                Створити
            </button>
        </form>
    )
}