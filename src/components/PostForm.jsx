import { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ create }) => {
  let [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: Date.now(),
    };

    create(newPost);

    //очищаем форму
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <MyInput
        type="text"
        placeholder="название поста"
        value={post.title}
        onChange={(event) => setPost({ ...post, title: event.target.value })}
      ></MyInput>
      <MyInput
        type="text"
        placeholder="описание поста"
        value={post.body}
        onChange={(event) => setPost({ ...post, body: event.target.value })}
      ></MyInput>
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
