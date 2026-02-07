import { useState } from 'react'
import style from  './CommentForm.module.css'
import { useCreateCommentMutation } from '../model/createCommentApi'

export function CommentForm({ postId }) {
  const [content, setContent] = useState('')
  const [createComment, { isLoading }] = useCreateCommentMutation()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    await createComment({ postId, text: content })
    setContent('')
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Напишіть коментар..."
        required
      />
      <button type="submit" disabled={isLoading}>
        Додати коментар
      </button>
    </form>
  )
}
