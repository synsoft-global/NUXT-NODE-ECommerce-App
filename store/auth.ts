import { defineStore } from "pinia";
import { type User as UserInterface } from "../types/user.Interface";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    user: null as UserInterface | null
  }),
  actions: {
    async authenticateUser(details: any) {
      // useFetch from nuxt 3
      const { data, pending } = await useFetch<UserInterface>('/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: details,
      });
      this.loading = pending.value;

      if (data?.value?.token) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data.value.token; // set token to cookie
        this.user = data.value; // set authenticated  state value to true
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});