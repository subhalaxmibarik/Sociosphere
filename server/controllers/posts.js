import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    
    // If you're using multer, the uploaded file path will be in req.file
    const picturePath = req.file ? req.file.filename : "";

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath, // image file path
      likes: {},
      comments: [],
    });

    await newPost.save();

    // Emit notification if needed
    if (req.io) {
      req.io.emit("receiveNotification", {
        type: "POST",
        message: `User ${userId} created a new post`,
        postId: newPost._id,
        postOwnerId: userId,
      });
    }

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    if (req.io) {
      req.io.emit("receiveNotification", {
        type: "LIKE",
        message: `User ${userId} liked your post`,
        postId: id,
        postOwnerId: post.userId,
      });
    }
    

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    // only post owner can delete
    if (post.userId !== req.user.id) {
      return res.status(403).json("Not authorized");
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
