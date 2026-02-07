import { CreatePostForm } from '@/features/posts/create-post/ui/CreatePostForm'
import { PostList } from '@/widgets/postList/PostList'

export default function PostsPage() {
  return (
    <div>
      <h1>Оголошення</h1>
      <CreatePostForm />
      <PostList />
    </div>
  )
}
