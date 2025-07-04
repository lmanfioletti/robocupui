import React, { useEffect, useState, createContext, useContext } from 'react';
// Define user roles
export type UserRole = 'user' | 'assistant' | 'judge' | 'admin';
// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
// Define auth context interface
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
  isAuthenticated: boolean;
}
// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  verifyEmail: async () => {},
  resetPassword: async () => {},
  confirmPasswordReset: async () => {},
  resendVerificationCode: async () => {},
  isAuthenticated: false
});
// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
// Auth provider component
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('botscoreUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock user data based on email for different roles
    let user: User;
    if (email.includes('admin')) {
      user = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin'
      };
    } else if (email.includes('judge')) {
      user = {
        id: '2',
        name: 'Judge User',
        email,
        role: 'judge'
      };
    } else if (email.includes('assistant')) {
      user = {
        id: '3',
        name: 'Assistant User',
        email,
        role: 'assistant'
      };
    } else {
      user = {
        id: '4',
        name: 'Regular User',
        email,
        role: 'user'
      };
    }
    setCurrentUser(user);
    localStorage.setItem('botscoreUser', JSON.stringify(user));
  };
  // Mock register function - in a real app, this would create a new user and send verification email
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would create a new user and send verification email
    localStorage.setItem('tempUser', JSON.stringify({
      name,
      email
    }));
  };
  // Mock verify email function - in a real app, this would verify the code and activate the account
  const verifyEmail = async (code: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would verify the code and activate the account
    const tempUser = JSON.parse(localStorage.getItem('tempUser') || '{}');
    const user: User = {
      id: Math.random().toString(),
      name: tempUser.name,
      email: tempUser.email,
      role: 'user'
    };
    setCurrentUser(user);
    localStorage.setItem('botscoreUser', JSON.stringify(user));
    localStorage.removeItem('tempUser');
  };
  // Mock reset password function - in a real app, this would send a password reset email
  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would send a password reset email
  };
  // Mock confirm password reset function - in a real app, this would verify the token and update the password
  const confirmPasswordReset = async (token: string, newPassword: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would verify the token and update the password
  };
  // Mock resend verification code function - in a real app, this would resend the verification code
  const resendVerificationCode = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would resend the verification code
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('botscoreUser');
  };
  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    confirmPasswordReset,
    resendVerificationCode,
    isAuthenticated: !!currentUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};