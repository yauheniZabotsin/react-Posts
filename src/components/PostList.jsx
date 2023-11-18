import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = (props) => {
  if (!props.posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдено!</h1>;
  }

  return (
    <div>
      <h1>Списки про {props.title}</h1>
      <TransitionGroup className="todo-list">
        {props.posts.map((p, index) => (
          <CSSTransition key={p.id} timeout={500} classNames="post">
            <PostItem
              removePost={props.removePost}
              number={index + 1}
              post={p}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
