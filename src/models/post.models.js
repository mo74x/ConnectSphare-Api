import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: [true, 'Post content cannot be empty'],
      trim: true,
      maxlength: [280, 'Post cannot be more than 280 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
    // We will add comments later
  }, {
    timestamps: true
  });
  const Post = mongoose.model('Post', postSchema);
  export default Post;