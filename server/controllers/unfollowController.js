const User = require('../models/User');

// Unfollow a user
const unfollow =  async (req, res) => {
  try {
    const userToUnfollow = await User.find({id: req.params.id});
    const currentUser = await User.find({id: req.user.id});

    if (!userToUnfollow) return res.status(404).json({ message: 'User not found' });

    // Remove userToUnfollow from currentUser's following list
    if (currentUser[0].following.includes(userToUnfollow[0].id)) {
      currentUser[0].following.pull(userToUnfollow[0].id);
      await User.findOneAndUpdate({id: currentUser[0].id}, currentUser[0]);

      // Remove currentUser from userToUnfollow's followers list
      userToUnfollow[0].followers.pull(currentUser[0].id);
      await User.findOneAndUpdate({id: userToUnfollow[0].id}, userToUnfollow[0]);


      res.status(200).json({ message: 'User unfollowed' });
    } else {
      res.status(400).json({ message: 'Not following this user' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = unfollow;
