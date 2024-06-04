const User = require('../models/User');

// Fetch following of a user
const fetchFollowing = async (req, res) => {
  try {
    const user = await User.find({id: req.params.id}).populate('following', 'username');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user[0].following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = fetchFollowing;
