import React, { useState } from "react";

export type LoginOptions = {
  email: string;
  password: string;
};
export type RegisterOptions = {
  email: string;
  password: string;
  name: string;
};

export type JWTTokenData = {
  id: number;
  name: string;
  email: string;
  iat: string;
  exp: string;
};

export type AuthContext = {
  token: string | null;
  actions: {
    login: (options: LoginOptions) => Promise<void>;
    register: (options: RegisterOptions) => Promise<void>;
    getTokenData: () => JWTTokenData | null;
    logout: () => void
  };
};

export const initialAuthContext = {
  token: null,
  actions: {
    login: async () => { },
    register: async () => { },
    getTokenData: () => null,
    logout: () => { }
  },
};

export const authContext = React.createContext<AuthContext>(initialAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(window.localStorage.getItem("access-token"));

  const login = async (values: LoginOptions) => {
    const loginRequest = await fetch("/api/user/token", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(loginRequest.status)
    if (loginRequest.status === 200) {
      const { data } = await loginRequest.json();
      console.log(data);
      window.localStorage.setItem("access-token", data)
      window.history.pushState('page2', 'Title', '/');
      // reload the page to get to the basepage url 
      window.location.reload();
    } else {
      throw new Error(
        "either the user does not exist or the Password is wrong"
      );
    }
  };
  const register = async (values: RegisterOptions) => {
    const registerRequest = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (registerRequest.status === 200) {
      login({ email: values.email, password: values.password })
    } else {
      throw new Error("Maybe the email you used already existed");
    }
  };
  const getTokenData = () => {
    if (token) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }
  const logout = () => {
    setToken(null)
    window.localStorage.removeItem("access-token");
  }
  return (
    <authContext.Provider
      value={{
        token,
        actions: {
          login,
          register,
          getTokenData,
          logout,
        },
      }}
    >
      {children}
    </authContext.Provider>
  );
};
