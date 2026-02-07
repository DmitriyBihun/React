import { selectAuthUser } from "@/features/auth";
import { useSelector } from "react-redux";
import { useDeleteCommentMutation } from "../model/deleteCommentApi";
import { roles } from "@/shared/config/roles";

function DeleteCommentButton({commentId, authorId}) {

    const user = useSelector(selectAuthUser)
    const [deleteComment, { isLoading }] = useDeleteCommentMutation()

    if (!user) return null

    const canDelete = user.role === roles.admin || authorId === user.id

    if (!canDelete) return null

    return (
        <button onClick={() => deleteComment(commentId)} disabled={isLoading}>
            {isLoading ? 'Видаляється…' : 'Видалити'}
        </button>
    );
}

export default DeleteCommentButton;