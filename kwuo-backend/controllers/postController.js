// 
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    
    const attachments = req.files?.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    })) || [];

    const post = await Post.create({
      title,
      body,
      attachments,
      createdBy: req.user._id,
      role: req.user.role
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const approvePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.approvals.includes(req.user._id)) {
      post.approvals.push(req.user._id);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
