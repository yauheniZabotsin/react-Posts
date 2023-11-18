import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import PostFilter from "../PostFilter";
import MyModal from "../UI/Modal/MyModal";
import PostForm from "../PostForm";
import Loader from "../UI/Loader/Loader";
import PostList from "../PostList";
import Pagination from "../UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    search: "",
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.search);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  function changePage(p) {
    setPage(p);
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MyModal visable={modal} setVisable={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      {postError && <h1>Error: "{postError}"</h1>}

      {isPostLoading ? (
        <Loader />
      ) : (
        <PostList
          removePost={removePost}
          posts={sortedAndSearchedPost}
          title={"IT"}
        />
      )}

      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
