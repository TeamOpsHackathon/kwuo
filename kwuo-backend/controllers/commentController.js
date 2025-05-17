import CitizenComment from '../models/CitizenComment.js';
import OfficialComment from '../models/OfficialComment.js';
import Post from '../models/Post.js';

export const addCitizenComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    
    const comment = await CitizenComment.create({
      text,
      user: req.user._id,
      post: postId
    });

    // Add to post's citizenComments array
    await Post.findByIdAndUpdate(postId, {
      $push: { citizenComments: comment._id }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addOfficialComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    
    const comment = await OfficialComment.create({
      text,
      user: req.user._id,
      post: postId
    });

    // Add to post's officialComments array
    await Post.findByIdAndUpdate(postId, {
      $push: { officialComments: comment._id }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { commentId } = req.params;

    // Verify parent comment exists and is a citizen comment
    const parentComment = await CitizenComment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ error: 'Parent comment not found' });
    }

    //Create reply (as a citizen comment)
    const reply = await CitizenComment.create({
      text,
      user: req.user._id,
      post: parentComment.post // Use same post as parent , Inherit post ID frm parent
    });

   // Add reply to parent's replies array
    await CitizenComment.findByIdAndUpdate(
      commentId,
      { $push: { replies: reply._id } },
      { new: true }
    );

    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: "Failed to add reply" , details : error.message});
  }
};
