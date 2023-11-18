import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, search) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sortedPosts]);

  return sortedAndSearchedPost;
};
