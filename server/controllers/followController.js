const User = require('../models/User');

// Follow a user
const follow = async (req, res) => {
  try {
    const userToFollow = await User.find({id: req.params.id}).lean();
    const currentUser = await User.find({id: req.user.id}).lean();

    if (!userToFollow) return res.status(404).json({ message: 'User not found' });

    // Prevent following oneself
    if (userToFollow[0].id === currentUser[0].id) return res.status(400).json({ message: 'Cannot follow yourself' });

    // Add userToFollow to currentUser's following list
    if (!currentUser[0].following.includes(userToFollow[0].id)) {
      currentUser[0].following.push(userToFollow[0].id);
      await User.findOneAndUpdate({id: currentUser[0].id}, currentUser[0]);

      // Add currentUser to userToFollow's followers list
      userToFollow[0].followers.push(currentUser[0].id);
      await User.findOneAndUpdate({id: userToFollow[0].id}, userToFollow[0]);


      res.status(200).json({ message: 'User followed' });
    } else {
      res.status(400).json({ message: 'Already following this user' });
    }
  } catch (error) {console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = follow;