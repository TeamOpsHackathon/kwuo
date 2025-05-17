// Simulate backend with localStorage
const STORAGE_KEY = "kwuo_posts";

// Save a post
export const savePost = (post) => {
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  posts.push(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// Get all posts
export const fetchPosts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};
