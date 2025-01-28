import { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [userId, setUserId] = useState(null);
  const { id: user_id } = useParams();

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
          if (user_id) {
            // Edit mode
            fetch(`http://localhost:8080/api/users/${user_id}`)
              .then(response => response.json())
              .then(data => {
                setUserId(data.user_id);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPassword(data.password);
                setRole(data.role);
              })
              .catch(error => console.error('Error fetching user:', error));
          }
        }, [user_id]);

  async function handleSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !role) {
      setNotificationMessage("All fields are required.");
      setNotificationType("error");
      setTimeout(() => setNotificationMessage(null), 3000);
      return;
    }

    setNotificationMessage(null); // Clear previous notification
    setNotificationType(null);
    
    let response;
    try {

      if (userId) {
        const user = {user_id, email, firstName, lastName, password, role };

      // Edit mode
        response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT", // PUT for updating the book
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } else {
      // Add mode
       response = await fetch('http://localhost:8080/api/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });
    }


      if (response.ok) {
        const data = await response.json();
        {isLoggedIn ? 
                      !user_id ? setNotificationMessage("User created successfully!") : setNotificationMessage("User updated successfully!")
           
                    :
          setNotificationMessage("Account created successfully!");
        }
        
        setNotificationType("success");
        setTimeout(() => setNotificationMessage(null), 1000); // Hide notification after 3 seconds

        // Clear form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole('');
        
        setTimeout(() => {isLoggedIn ? 
          navigate('/user-list') :
          navigate('/login')
        }, 1000)
        
      } else {
        const errorData = await response.json();
        {!user_id ? 
          setNotificationMessage(errorData.messages || "Failed to create user.") : 
          setNotificationMessage(errorData.messages || "Failed to update user.")
        }
        
        setNotificationType("error");
        setTimeout(() => setNotificationMessage(null), 3000); // Hide notification after 3 seconds
      }
    } catch (error) {
        // Handle network or other unexpected errors
        console.log("unexpected", error)
        {!user_id ? 
          setNotificationMessage(errorData.messages || "Failed to create user.") : 
          setNotificationMessage(errorData.messages || "Failed to update user.")
        }
        setNotificationType("error");
        setTimeout(() => setNotificationMessage(null), 3000); // Hide notification after 3 seconds
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{backgroundColor: '#3333'}}>
        <div className="container-fluid d-flex min-vh-100 align-items-center justify-content-center row">
          <div className="card text-center row py-5 bg-light col-md-6">

          {isLoggedIn ? 
                            !user_id ? 
                                <div className="card-header  mb-3 text-center col-md-12 h1 text-secondary">
                                    <h4>Create a User</h4>
                                </div> : 
                                <div className="card-header  mb-3 text-center col-md-12 h1 text-secondary">
                                    <h4>Update a User</h4>
                                </div> 
                      :
            <div className="mb-3 text-center col-md-12 h1 text-secondary">
              Create an Account
            </div>
          }
            {notificationMessage && (
              <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                {notificationMessage}
              </div>
            )}
            <div>
              <label className="form-label col-md-12">
                First Name
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </label>
            </div>
            <div>
              <label className="form-label col-md-12">
                Last Name
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </label>
            </div>
            <div>
              <label className="form-label col-md-12">
                Username
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                />
              </label>
            </div>
            {!user_id && 
              <div>
              <label className="form-label col-md-12">
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                />
              </label>
            </div>
            }
            
            <div>
              <label className="form-label col-md-12">
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                >
                  <option value="">--Select Role--</option>
                  <option value="Member">Member</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {!isLoggedIn && (
              <div className='text-center'>
                <Link to='/login' className='text-warning'>Already have an account? Sign In!</Link>
              </div>
             )}
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
