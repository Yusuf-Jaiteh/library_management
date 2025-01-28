// import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import React, { useState, useEffect } from 'react';

// import AddBook from './components/AddBook'
// import AddBorrow from './components/AddBorrow'
// import SignUp from './components/SignUp'
// import BookList from './components/BookList'
// import Login from './components/Login'
// import BookListTable from './components/BookListTable'
// import UserListTable from './components/UserListTable'
// import BorrowListTable from './components/BorrowListTable'
// import HomePage from './components/HomePage'
// import { AuthProvider } from './components/AuthContext';
// import { useAuth } from './components/AuthContext';

// function App() {
  

//   return (
//     <>
//       <AuthProvider>
//         <Router>
//                 <div className="App">
//                     <Routes>
//                         <Route path="/" element={ <Login />} />   
//                         <Route path="/home-page" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace={true} />} />
//                         <Route path="/signup" element={<SignUp />} />
//                         <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home-page" replace={true} />} />
//                         <Route path="/book-list" element={isLoggedIn ? <BookList /> : <Navigate to="/login" replace={true} />} />
//                         <Route path="/book-list-table" element={isLoggedIn ? <BookListTable /> : <Navigate to="/login" replace={true} />} /> 
//                         <Route path="/user-list" element={isLoggedIn ? <UserListTable /> : <Navigate to="/login" replace={true} />} />
//                         <Route path="/borrow-list" element={isLoggedIn ? <BorrowListTable /> : <Navigate to="/login" replace={true} />} />
//                         <Route path="/add-book" element={isLoggedIn ? <AddBook /> : <Navigate to="/login" replace={true} />} />
//                         <Route path="/add-borrow" element={isLoggedIn ? <AddBorrow /> : <Navigate to="/login" replace={true} />} />
//                     </Routes>
//                 </div>
//         </Router>
//       </AuthProvider>     
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import AddBook from './components/AddBook';
import AddBorrow from './components/AddBorrow';
import SignUp from './components/SignUp';
import BookList from './components/BookList';
import Login from './components/Login';
import BookListTable from './components/BookListTable';
import UserListTable from './components/UserListTable';
import BorrowListTable from './components/BorrowListTable';
import HomePage from './components/HomePage';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home-page"
              element={
                <AuthRoute>
                  <HomePage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup/:id?"
              element={
                
                  <SignUp />
              
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/book-list"
              element={
                <AuthRoute>
                  <BookList />
                </AuthRoute>
              }
            />
            <Route
              path="/book-list-table"
              element={
                <AuthRoute>
                  <BookListTable />
                </AuthRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <AuthRoute>
                  <UserListTable />
                </AuthRoute>
              }
            />
            <Route
              path="/borrow-list"
              element={
                <AuthRoute>
                  <BorrowListTable />
                </AuthRoute>
              }
            />
            <Route
              path="/add-book/:id?"
              element={
                <AuthRoute>
                  <AddBook />
                </AuthRoute>
              }
            />
            <Route
              path="/add-borrow/:id?"
              element={
                <AuthRoute>
                  <AddBorrow />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// This is a reusable wrapper to check authentication before rendering
const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Now this will work since it is inside AuthProvider
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default App;
