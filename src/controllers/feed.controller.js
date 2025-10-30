import Post from "../models/post.models.js";


//feed for the logged-in user
const getfeed= async(req,res)=>{
    try {
          const follwingList= req.user.following;

          const feedPosts= await Post.find({ author :{$in:follwingList}})
          .populate('auther','username profilePicture')
          .sort({createdAt:-1})
          .limit(20);

    } catch (error) {
        res.status(500).json({message :error.message})
    }
}
export{getfeed};
