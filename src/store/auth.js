import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const state = reactive({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  });

  const isAuthenticated = computed(() => {
    return state.user ? true : false;
  });

  const handleRegister = async (payload) => {
    const { data } = await axios.post(
      "http://localhost:5000/register",
      payload
    );

    state.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  };

  const handleLogin = async (payload) => {
    const { data, status } = await axios.post(
      "http://localhost:5000/login",
      payload
    );
    if (data && status === 200) {
      state.user = data;
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      console.log(data);
      throw new Error(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    state.user = null;
  };

  return { state, isAuthenticated, handleRegister, handleLogin, handleLogout };

  // {
  //   state() {
  //     return {
  //       user: localStorage.getItem("user")
  //         ? JSON.parse(localStorage.getItem("user"))
  //         : null,
  //     };
  //   },
  //   actions: {
  //     async handleRegister(payload) {
  //       const response = await fetch("http://localhost:5000/register", {
  //         method: "POST",
  //         body: JSON.stringify(payload),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const data = await response.json();
  //       this.user = data;
  //       localStorage.setItem("user", JSON.stringify(this.user));
  //     },
  //     async handleLogin(payload) {
  //       const response = await fetch("http://localhost:5000/login", {
  //         method: "POST",
  //         body: JSON.stringify(payload),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if (response.ok && response.status === 200) {
  //         const data = await response.json();
  //         this.user = data;
  //         localStorage.setItem("user", JSON.stringify(this.user));
  //       } else {
  //         const data = await response.json();
  //         console.log(data);
  //         throw new Error(data);
  //       }
  //     },
  //     handleLogout() {
  //       localStorage.removeItem("user");
  //       this.user = null;
  //     },
  //     // async currentUser() {
  //     //   if (this.user) {
  //     //     const response = await fetch("http://localhost:5000/current-user", {
  //     //       headers: { authorization: `Bearer ${this.user.accessToken}` },
  //     //     });
  //     //     if (response.ok && response.status === 400) {
  //     //       this.user = null;
  //     //       localStorage.removeItem("user");
  //     //     }
  //     //     return await response.json();
  //     //   }
  //     //   return false;
  //     // },
  //   },
  //   getters: {
  //     isAuthenticated() {
  //       // let isLoggedIn = false;
  //       // this.currentUser().then((data) => {
  //       //   isLoggedIn = data;
  //       //   console.log(data);
  //       // });
  //       return this.user ? true : false;
  //     },
  //   },
  // }
});
