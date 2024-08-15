import axios from "axios";

const API_KEY = import.meta.env.VITE_STRIPE_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

const createResume = async (data) => {
  try {
    const response = await axiosClient.post("user-resumes", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating resume:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getResumes = async (email) => {
  try {
    const response = await axiosClient.get(
      "user-resumes?filters[userEmail][$eq]=" + email
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching resumes:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateResume = (id, data) => axiosClient.put(`user-resumes/${id}`, data);

const getResume = async (id) => {
  try {
    const response = await axiosClient.get(`user-resumes/${id}?populate=*`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching resume:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { createResume, getResumes, updateResume, getResume };
