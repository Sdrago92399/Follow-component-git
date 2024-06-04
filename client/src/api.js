import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const generateToken = async () => {
  try {
    const response = await api.post('/generate-token');
    return response.data;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export const followUser = async (userId, token) => {
  try {
    const response = await api.post(`/follow/${userId}`, {}, {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId, token) => {
  try {
    const response = await api.post(`/unfollow/${userId}`, {}, {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

export const getFollowers = async (userId, token) => {
  try {
    const response = await api.post(`/${userId}/followers`, {}, {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

export const getFollowing = async (userId, token) => {
  try {
    const response = await api.post(`/${userId}/following`, {}, {
      headers: { Authorization: `${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
};
