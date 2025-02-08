import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,

  isSigningUp: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signup", error.message);
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  isLoggingIn: false,
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in login", error.message);
      toast.error(error.response.data.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },

  isLoggingOut: false,
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      console.log("Error in logout", error.message);
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  isCheckingAuth: true,
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/check");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.log("Error in auth check", error.message);
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
