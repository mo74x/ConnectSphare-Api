import Post from "../models/post.models.js";
import Comment from "../models/comment.models.js";

// create New Post
const createPost = async (req, res) => {
    const { content } = req.body;
  
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
  
    try {
      const post = await Post.create({
        content,
        author: req.user.id // From our 'protect' middleware
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
//Get ALL Posts
const getPosts = async (req, res) => {
    try {
      const posts = await Post.find({})
        .populate('author', 'username') //Populate with username only
        .sort({ createdAt: -1 }); // Show newest first
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

//Delets post
const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the logged-in user is the author of the post
      if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
  
      await post.deleteOne();
      res.json({ message: 'Post removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  
// like post or unlike
const likePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the post has already been liked by this user
      const isLiked = post.likes.includes(req.user.id);
  
      if (isLiked) {
        // --- Unlike the post ---
        post.likes = post.likes.filter(
          (userId) => userId.toString() !== req.user.id
        );
      } else {
        // --- Like the post ---
        post.likes.push(req.user.id);
      }
  
      await post.save();
      res.json({ message: 'Post like status updated', likes: post.likes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//lets create the comments 
const createCommentOnPost = async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
  
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = await Comment.create({
        text,
        author: req.user.id,
        post: req.params.id
      });
  
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 //get all comment for post 
 const getCommentsForPost = async (req, res) => {
    try {
      const comments = await Comment.find({ post: req.params.id })
        .populate('author', 'username')
        .sort({ createdAt: 'asc' }); // Oldest comments first
  
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
export{deletePost,getPosts,createPost,likePost,getCommentsForPost,createCommentOnPost};