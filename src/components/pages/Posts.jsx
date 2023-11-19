import React, { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import PostFilter from "../PostFilter";
import MyModal from "../UI/Modal/MyModal";
import PostForm from "../PostForm";
import Loader from "../UI/Loader/Loader";
import PostList from "../PostList";
import Pagination from "../UI/pagination/Pagination";
import MySelect from "../UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: "",
    search: "",
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.search);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const lastElement = useRef();
  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

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

      <MySelect
        defaultValue={"Кол-во элемнтов на странице"}
        value={limit}
        onChange={(value) => setLimit(value)}
        options={[
          { value: 1, name: "1" },
          { value: 5, name: "5" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      ></MySelect>

      <PostList
        removePost={removePost}
        posts={sortedAndSearchedPost}
        title={"IT"}
      />
      <div ref={lastElement}></div>

      {isPostLoading && <Loader />}

      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
