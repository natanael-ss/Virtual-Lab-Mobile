import axios from 'axios';

const BASE_URL = 'https://spelbad.vercel.app'; // Replace with your server's URL

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login-user`, { email, password });
    return response.data; // Returns user data or error message
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 2xx
      return { error: error.response.data.message };
    } else {
      // Network or other error
      return { error: 'An error occurred. Please try again later.' };
    }
  }
};

export const registerUser = async (name: string, email: string, password: string, confPassword: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/register-user`, { name, email, password, confPassword });
    return response.data; // Returns user data or error message
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 2xx
      return { error: error.response.data.message };
    } else {
      // Network or other error
      return { error: 'An error occurred. Please try again later.' };
    }
  }
};

