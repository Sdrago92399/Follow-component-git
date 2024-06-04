const User = require('../models/User');

// Fetch followers of a user
const fetchFollower = async (req, res) => {
  try {
    const user = await User.find({id: req.params.id}).populate('followers', 'username');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user[0].followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = fetchFollower;
