import { useState } from 'react'
import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { PostCard } from '@/entities/post/ui/PostCard'

export function PostList() {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useGetPostsQuery({ page, limit })

  if (isLoading) return <div>Завантаження оголошень...</div>
  if (error) return <div>Помилка: {error.toString()}</div>

  const posts = data.items || []
  console.log('==posts')
  console.log(data)

  const totalPages = data?.totalPages || 1

  return (
    <div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Назад
        </button>
        <span style={{ margin: '0 10px' }}>
          Сторінка {page} з {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  )
}
