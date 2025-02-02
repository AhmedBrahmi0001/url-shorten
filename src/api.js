import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/url"; 

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, {
      originalUrl,
    });
    return response.data; 
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw error; 
  }
};

export const getUrlDetails = async (shortCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${shortCode}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching URL details:", error);
    throw error;
  }
};
