import { React, createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api.js";
import { toast } from "react-hot-toast";

const AuthContext = createContext({});

function AuthProvider({ children }) {

  const [data, setData] = useState({});

  async function signIn({username, senha}) {

    try {

      const response = await api.post('/user/login', {username, senha });

      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      setData({ user: response.data.user, token: response.data.token });

      localStorage.setItem("@cardapiosadmin:token", response.data.token);

    } catch (e) {
      toast.error(e.response.data.msg)
    }
    
  }

  function signOut({location}) {

    localStorage.removeItem("@cardapiosadmin:token");

    if (location != null) {

      if (location.pathname != '/') {
        window.location.replace('/')
      }

    } else {
      window.location.replace('/')
    }
    
    setData({user: null, token: null})
    
  }

  useEffect(() => {

    const token = localStorage.getItem("@cardapiosadmin:token");

    if (token != null) {

      async function fetchData() {

        try {

          const response = await api.get(`/user/token/${token}`);

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setData({ conta: response.data.user, token: response.data.token });

        } catch (e) {
          signOut({location: null})
        }

      }

      fetchData()
    } else {
      setData({user: null, token: null})
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
        token: data.token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth, AuthContext };