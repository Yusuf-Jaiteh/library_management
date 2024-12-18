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


import React from 'react';
import logo from '../assets/loginPic.jpg';  // Make sure the image path is correct
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

function Login() {
  return (
    <>
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          {/* Left side - Image */}
          <div className="col-md-6 text-center">
            <img src={logo} alt="Library Logo" className="img-fluid" />
          </div>

          {/* Right side - Form */}
          <div className="col-md-6">
            <div className="text-center mb-4">
              <h4>Welcome to Universal Library Management System</h4>
              <h5>Sign into your account</h5>
            </div>

            <form>
              <div className="mb-3">
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
