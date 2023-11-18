import PostIdPage from "../PostIdPage";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Posts from "../pages/Posts";

export const privateRoutes = [
  { path: "/about", element: About },
  { path: "/posts", element: Posts },
  { path: "/posts/:id", element: PostIdPage },
  { path: "/error", element: Error },
];

export const publicRoutes = [{ path: "/login", element: Login }];
