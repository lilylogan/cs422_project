/* 
AuthContext.js
Description: Holds logic for if user is authenitcated, used in many other sections to
access details on current user. 
Date: November 8th, 2024
Inital Author: Ellison Largent
Modified By: 
*/
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for authentication state that will be available throughout the app
const AuthContext = createContext(null);

// Get the backend URL from environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * AuthProvider Component
 * 
 * This component provides authentication state and methods to all child components.
 * It handles user authentication state, login, logout, and session checking.
 * 
 * Usage:
 * ```jsx
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourApp />
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export const AuthProvider = ({ children }) => {
    // Track the current user and loading state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication status when the component mounts
    useEffect(() => {
        checkAuth();
    }, []);

    /**
     * Checks if the user is currently authenticated by validating their session
     * with the backend server. Updates the user state accordingly.
     */
    const checkAuth = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/check-auth`, {
                credentials: 'include'  // Includes cookies in the request
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);  // Indicate that initial auth check is complete
        }
    };

    /**
     * Authenticates the login of a user with their email and password
     * 
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Object} Response object with success status and potential error message
     * 
     * Usage:
     * ```jsx
     * const { login } = useAuth();
     * const handleLogin = async () => {
     *   const result = await login('user@example.com', 'password');
     *   if (result.success) {
     *     // Handle successful login
     *   } else {
     *     // Handle error: result.error
     *   }
     * };
     * ```
     */
    const login = async (email, password) => {
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                credentials: 'include',  // Important for handling cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred during login' };
        }
    };

    /**
     * Logs out the current user by clearing their session
     * 
     * Usage:
     * ```jsx
     * const { logout } = useAuth();
     * const handleLogout = async () => {
     *   await logout();
     *   // Handle post-logout actions
     * };
     * ```
     */
    const logout = async () => {
        try {
            await fetch(`${BACKEND_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Provide authentication context to child components
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {/* Only render children once the initial auth check is complete */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to access authentication context
 * 
 * Returns an object containing:
 * - user: Current user object or null if not authenticated
 * - loading: Boolean indicating if auth status is being checked
 * - login: Function to log in a user
 * - logout: Function to log out the current user
 * - checkAuth: Function to check current authentication status
 * 
 * Usage:
 * ```jsx
 * function MyComponent() {
 *   const { user, login, logout } = useAuth();
 *   
 *   if (user) {
 *     return <div>Welcome, {user.name}! <button onClick={logout}>Logout</button></div>;
 *   }
 *   
 *   return <button onClick={() => login(email, password)}>Login</button>;
 * }
 * ```
 */
export const useAuth = () => useContext(AuthContext);