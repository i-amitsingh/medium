import axios from "axios";
const URL = "http://localhost:3000";

export async function getPosts() {
  // http://localhost:3000/posts
  const response = await axios.get(`${URL}/posts`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("user")}`,
    },
  });
  if (response.status == 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getPost(id) {
  const response = await axios.get(`${URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("user")}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createPost(post) {
  // http://localhost:3000/posts
  const response = await axios.post(`${URL}/posts`, post);
  return response;
}

export async function updatePost(id, post) {
  // http://localhost:3000/posts/1
  const response = await axios.put(`${URL}/posts/${id}`, post);
  return response;
}

export async function deletePost(id) {
  // http://localhost:3000/posts/1
  const response = await axios.delete(`${URL}/posts/${id}`);
  return response;
}

export async function createUser(user) {
  // http://localhost:3000/users
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

export async function getUser(id) {
  // http://localhost:3000/users/1
  const response = await axios.get(`${URL}/users/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function updateUser(id, user) {
  // http://localhost:3000/users/1
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  // http://localhost:3000/users/login
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}
