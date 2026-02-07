import DeleteCommentButton from '@/features/comments/delete-comment/ui/DeleteCommentButton'
import style from './CommentItem.module.css'

export function CommentItem({ comment }) {

  return (
    <div className={style.content}>

      <span>
        <b>{comment.authorName}</b>: {comment.text}
      </span>

      <DeleteCommentButton commentId={comment.id} authorId={comment.authorId} />

    </div>
  )
}
