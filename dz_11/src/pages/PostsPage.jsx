import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts/postsThunks";
import { deletePost } from "../redux/slices/posts/postsSlice";
import style from './PostsPage.module.css'

function PostsPage() {

    const dispatch = useDispatch()
    const { postsList, loading, error } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if (loading) return <p>Loading</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className={style.postContainer}>
            <h1 className={style.title}>Posts</h1>
            <ul className={style.list}>
                {postsList.map(post => (
                    <li key={post.id}>
                        <p>{post.title}</p>
                        <button onClick={() => dispatch(deletePost(post.id))}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsPage;