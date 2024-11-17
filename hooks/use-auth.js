import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

export function useAuth() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(API_ENDPOINTS.AUTH.ME, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
          } else {
            // If ME request fails, sign out the user
            await signOut({ redirect: true, callbackUrl: "/login" });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          await signOut({ redirect: true, callbackUrl: "/login" });
        }
      }
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchUserData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return {
    user,
    session,
    status,
    loading,
    isAuthenticated: status === "authenticated",
    logout,
  };
}
