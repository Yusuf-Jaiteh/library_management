
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userId, setUserId] = useState(null);
//     const [token, setToken] = useState(null); 
//     const [role, setRole] = useState(null);

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUserId = localStorage.getItem('userId');
//         const storedRole = localStorage.getItem('role');
//         setIsLoggedIn(!!storedToken);
//         console.log('from auth ue',isLoggedIn)
//         setUserId(storedUserId);
//         setToken(storedToken); 
//         setRole(storedRole);
//     }, []);

//     const login = (token, id, role) => {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', id);
//         localStorage.setItem('role', role);
//         setIsLoggedIn(true);
//         console.log('from auth login',isLoggedIn)
//         setUserId(id);
//         setToken(token); 
//         setRole(role);
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('role');
//         setIsLoggedIn(false);
//         setUserId(null);
//         setToken(null); 
//         setRole(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, userId, token, role, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setUserId(storedUserId);
    setToken(storedToken);
    setRole(storedRole);
    setLoading(false); // Set loading to false after the effect runs
  }, []);

  const login = (token, id, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setUserId(id);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    setRole(null);
  };

  // If loading is true, show a loading spinner or return null
  if (loading) {
    return <div>Loading...</div>; // Or return some loading indicator
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

