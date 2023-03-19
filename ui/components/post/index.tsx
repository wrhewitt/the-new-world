import PostList from './list'
import usePosts from '../../hooks/usePost'

export default function Post() {
  const { text, setText, posts, onSubmit, onDelete } = usePosts()

  return (
    <div className="mt-20">
      <PostList posts={posts} onDelete={onDelete} />
    </div>
  )
}
