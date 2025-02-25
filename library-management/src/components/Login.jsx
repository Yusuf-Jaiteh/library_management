// import logo from '../assets/loginPic.jpg'
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Login(){

//     return(
//         <>
//             <div>
//                 <div>
//                     <img src={logo} alt="Picture of books"></img>
//                 </div>
//                 <div>
//                     <h4> Welcome to universal library management system</h4>
//                     <h5> Sign into your account</h5>
//                     <form>
//                         <input type="email" required placeholder="Enter your email"></input>
//                         <input type="password" required placeholder="Enter your password"></input>
//                         <button className='btn btn-primary' type="submit">Login</button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login


// import React from 'react';
// import logo from '../assets/loginPic.jpg';  // Make sure the image path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

// function Login() {
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             {/* Logo Image */}
//             <div className="text-center mb-4">
//               <img src={logo} alt="Library Logo" className="img-fluid" />
//             </div>

//             {/* Welcome Text */}
//             <div className="text-center mb-3">
//               <h4>Welcome to Universal Library Management System</h4>
//               <h5>Sign into your account</h5>
//             </div>

//             {/* Login Form */}
//             <form>
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   required
//                   className="form-control"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="password"
//                   required
//                   className="form-control"
//                   placeholder="Enter your password"
//                 />
//               </div>
//               <div className="text-center">
//                 <button className="btn btn-primary" type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// import React from 'react';
// import logo from '../assets/loginPic.jpg';  // Make sure the image path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

// function Login() {
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row justify-content-center align-items-center">
//           {/* Left side - Image */}
//           <div className="col-md-6 text-center">
//             <img src={logo} alt="Library Logo" className="img-fluid" />
//           </div>

//           {/* Right side - Form */}
//           <div className="col-md-6">
//             <div className="text-center mb-4">
//               <h4>Welcome to Universal Library Management System</h4>
//               <h5>Sign into your account</h5>
//             </div>

//             <form>
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   required
//                   className="form-control"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="password"
//                   required
//                   className="form-control"
//                   placeholder="Enter your password"
//                 />
//               </div>
//               <div className="text-center">
//                 <button className="btn btn-primary" type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import logo from '../assets/loginPic.jpg';  // Make sure the image path is correct
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { useAuth } from './AuthContext';

function Login() {
  
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const { login } = useAuth();

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.ok) {
           const { jwt, userId, role } = result;
           login(jwt, userId, role);
           setNotificationMessage("Login successfull!");
           setNotificationType("success");
          setTimeout(() => setNotificationMessage(null), 1000);
          
          setUserName('');
          setPassword('');

           setTimeout(() =>  navigate('/home-page'), 1000); 
            
           
        } else {
          const errorData = await response.json();
          setNotificationMessage(errorData.message || "Failed to Login.");
          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 3000); 
        }
    } catch (error) {
      setNotificationMessage("Invalid Credentials!.");
      setNotificationType("error");
      setTimeout(() => setNotificationMessage(null), 3000); 
    }
};



  return (
    <>
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center " style={{backgroundColor: '#3333'}}> 
        <div className="row w-100">
          
          <div className="col-md-6 text-center">
            <img src={logo} alt="Library Logo" className="img-fluid" />
          </div>

          
          <div className="col-md-6">
            <div className="text-center mb-4">
              <h4>Welcome to Universal Library Management System</h4>
              <h5>Sign into your account</h5>
            </div>

            <form>
            {notificationMessage && (
              <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                {notificationMessage}
              </div>
            )}

              <div className="mb-3">
                <input
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-3">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-center">
                <button onClick={handleSubmit} className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className='text-center'>
                <Link to='/signup' className='text-warning'>Don't have an account? Sign Up!</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
