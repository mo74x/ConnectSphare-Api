import Post from "../models/post.models.js";


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
//
export{deletePost,getPosts,createPost};