import { selectAuthUser } from "@/features/auth";
import { useSelector } from "react-redux";
import { useDeletePostMutation } from "../model/deletePostApi";
import { roles } from "@/shared/config/roles";

function DeletePostButton({ post }) {

    const user = useSelector(selectAuthUser)
    const [deletePost, { isLoading }] = useDeletePostMutation()

    if (!user) return null

    const canDelete = user.role === roles.admin || (user.role === roles.manager && post.authorId === user.id)

    if (!canDelete) return null

    return (
        <button disabled={isLoading} onClick={() => deletePost(post.id)}>
            Видалити
        </button>
    );
}

export default DeletePostButton;