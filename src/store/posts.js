import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

const API_URL = "http://localhost:5000";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);

  const getPosts = async () => {
    const { data } = await axios.get(
      `${API_URL}/posts?_sort=createdAt&_order=desc`
    );
    posts.value = data;
  };

  const getPost = async (id) => {
    const { data } = await axios.get(`${API_URL}/posts/${id}`);
    return data;
  };

  const getPostsByUser = async () => {
    const { state } = useAuthStore();

    const { data } = await axios.get(`${API_URL}/posts/user`, {
      headers: { Authorization: `Bearer ${state.user.accessToken}` },
    });

    return data;
  };

  const createPost = async (payload) => {
    const { state } = useAuthStore();

    await axios.post(`${API_URL}/posts`, payload, {
      headers: { Authorization: `Bearer ${state.user.accessToken}` },
    });
  };

  const updatePost = async (postId, payload) => {
    const { state } = useAuthStore();

    const { data } = await axios.patch(`${API_URL}/posts/${postId}`, payload, {
      headers: { Authorization: `Bearer ${state.user.accessToken}` },
    });

    return data;
  };

  return { posts, getPosts, getPost, getPostsByUser, createPost, updatePost };
});
