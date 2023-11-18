import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import Loader from "./UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPosts, isPostLoading, postError] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, CommentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPosts(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c ID {params.id} </h1>

      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="post__content">
          <strong>
            {post.id}. {post.title}
          </strong>
          <div>{post.body}</div>
        </div>
      )}

      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: 15 }}>
              <p>
                Name: <strong>{comm.name}</strong> ({comm.email})
              </p>
              <div>Comment: {comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
