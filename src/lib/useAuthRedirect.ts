
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "./authStore";

export function useAuthRedirect({ requireAuth }: { requireAuth: boolean }) {
  const router = useRouter();
  const { setUser, setToken, logout } = useAuthStore();

  useEffect(() => {
    axiosInstance
      .get("/users/me")
      .then((res) => {
        setUser(res.data);
        setToken("token"); // You can store the token if needed
        if (!requireAuth) router.replace("/dashboard");
      })
      .catch(() => {
        logout();
        if (requireAuth) router.replace("/");
      });
    // eslint-disable-next-line
  }, []);
}