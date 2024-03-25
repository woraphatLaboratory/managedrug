import { defineStore } from "pinia";
import axios, {all} from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    statusToken :[],
  }),
  getters: {

    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        const response = (await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/drug/user/login",
          { userName: userLogin, passWord: passwordLogin },
          {
            headers: { "Content-Type": "application/json" },
          }
        )).data
        // const user = response.data
        if (response.status === 401){
          console.log('รหัสผ่านผิด')
          // this.isAuthenticated = false;
          return false
        }else{
          // this.isAuthenticated = true;
          this.user = response;
          this.token = response.token
          this.id = response.id
          localStorage.setItem("user", JSON.stringify(response));
          localStorage.setItem("idUser", JSON.stringify(response.id));
          localStorage.setItem("fname", JSON.stringify(response.fullname));
          localStorage.setItem("token", JSON.stringify(response.token));
          return true
        }
        // console.log("login", user);
      } catch (error) {
        console.error(error);
      }
    },

    async Authen() {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.post(
              import.meta.env.VITE_API_URL +
              "/12Trading/checkToken",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
          );
          this.statusToken = response.status
          console.log(response.status)
        }catch (error) {
          // console.log(error.response.status)
        }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.clear()
    },
  },
});
