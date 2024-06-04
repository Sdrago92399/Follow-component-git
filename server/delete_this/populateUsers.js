const User = require('../models/User');

const users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  { id: 4, username: 'user4', email: 'user4@example.com', password: 'password4', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  { id: 5, username: 'user5', email: 'user5@example.com', password: 'password5', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
];

exports.populateDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Database populated with sample users');
  } catch (error) {
    console.error('Error populating database', error);
  }
};