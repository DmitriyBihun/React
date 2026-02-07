import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'

import { CommentForm } from '../comments'
import { CommentList } from '@/widgets/commentList/CommentList'

import style from './PostCard.module.css'
import DeletePostButton from '@/features/posts/delete-post/ui/DeletePostButton'
import { EditPostButton } from '@/features/posts/update-post/ui/EditPostButton'

export function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false)
  const user = useSelector(selectAuthUser)

  return (
    <div className={style.cardContainer}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div>
        <small>Автор: {post.author?.name}</small>
      </div>
      <DeletePostButton post={post} />
      <EditPostButton post={post} />

      <button
        onClick={() => setShowComments((v) => !v)}
        style={{ marginTop: 10 }}
      >
        {showComments ? 'Сховати коментарі' : 'Показати коментарі'}
      </button>
      {showComments && (
        <>
          <CommentList postId={post.id} />
          {user && <CommentForm postId={post.id} />}
        </>
      )}
    </div>
  )
}
