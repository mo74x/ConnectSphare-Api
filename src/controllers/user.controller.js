import User from "../models/user.model.js";

const getUserProfile = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username })
        .select('-password'); // Exclude password from the result
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 const followUser = async (req, res) => {
    try {
      // The user to follow
      const userToFollow = await User.findById(req.params.id);
      // The currently logged-in user
      const currentUser = await User.findById(req.user.id);
  
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Prevent user from following themselves
      if (userToFollow.id === currentUser.id) {
          return res.status(400).json({ message: 'You cannot follow yourself' });
      }
  
      // Check if already following
      if (currentUser.following.includes(userToFollow.id)) {
        // --- Unfollow Logic ---
        currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow.id);
        userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser.id);
        await currentUser.save();
        await userToFollow.save();
        res.json({ message: 'User unfollowed successfully' });
      } else {
        // --- Follow Logic ---
        currentUser.following.push(userToFollow.id);
        userToFollow.followers.push(currentUser.id);
        await currentUser.save();
        await userToFollow.save();
        res.json({ message: 'User followed successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export {followUser,getUserProfile};