import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_PRODUCTION_URL


const handleResponse = (response) => {
  const data = response.data;
  if (data) {
    return data;
  } else {
    console.error("Unexpected response format :", response.data);
    throw new Error("Unexpected response format :");
  }
};

const handleError = (error) => {
  console.error(error);
  throw error;
};

const fetchAllItems = (endpoint) => {
  return axios
    .get(`${BaseUrl}/${endpoint}`)
    .then(handleResponse)
    .catch(handleError);
};

const fetchOneItem = (endpoint, id) => {
  return axios
    .get(`${BaseUrl}/${endpoint}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};


 

const updateItem = (endpoint, id, data) => {
  return axios
    .put(`${BaseUrl}/${endpoint}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

const createItem = (endpoint, data) => {
  return axios
    .post(`${BaseUrl}/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

const deleteItem = (endpoint, id) => {
  return axios
    .delete(`${BaseUrl}/${endpoint}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export { fetchAllItems, fetchOneItem, deleteItem, createItem, updateItem};
