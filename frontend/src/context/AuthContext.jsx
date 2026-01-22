import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/user/is-auth");
      setUser(res.data.user);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    try {
      await api.post("/user/login", data);
      await checkAuth();
      toast.success("Login successful 🎉");
    } catch (error) {
      toast.error("Invalid email or password ❌");
      throw error;
    }
  };

  const register = async (data) => {
    try {
      await api.post("/user/register", data);
      toast.success("Account created successfully 🎊");
    } catch (error) {
      toast.error("Registration failed ❌");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      setIsAuth(false);
      toast.info("Logged out 👋");
    } catch (error) {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        isAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
