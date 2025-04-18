import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser() {
  return localStorage.getItem('loggedUser');
}

function getUsers(): Record<string, string> {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : {};
}

function setUsers(users: Record<string, string>) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedUser', user);
    } else {
      localStorage.removeItem('loggedUser');
    }
  }, [user]);

  const login = (username: string, password: string) => {
    const users = getUsers();
    if (users[username] && users[username] === password) {
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username: string, password: string) => {
    const users = getUsers();
    if (users[username]) {
      return false; // usuario ya existe
    }
    users[username] = password;
    setUsers(users);
    setUser(username);
    return true;
  };

  return (
    <AuthContext.Provider value={{ loggedIn: !!user, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
