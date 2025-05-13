import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  const { content } = req.body;
  const author = req.user.id; // Author is the authenticated user

  try {
    const post = new Post({ content, author });
    await post.save();
    res.status(201).json(post); // Respond with the post object including the generated _id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Avoid duplicate likes
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    post.likes.push(req.user.id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the user has already liked the post
    if (!post.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You haven't liked this post yet" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter(
      (userId) => userId.toString() !== req.user.id.toString()
    );
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comment on a post
export const commentOnPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Add comment with user id and text
    post.comments.push({ user: req.user.id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Share a post
export const sharePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.shares += 1; // Increment share count
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
