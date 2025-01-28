import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/loginPic.jpg';
import {  useNavigate } from 'react-router-dom';
import AdminNavbar from './Navbars/Navbar';

function UserListTable(){

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
    }, [users]);

   
    function fetchUsers(){
        axios.get('http://localhost:8080/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }
    function deleteUser(id){
        const isDelete = confirm("Do you want to delete this user!");
        if(isDelete){
            const response = fetch(`http://localhost:8080/api/users/${id}` ,{
                method: "DELETE",
            })
            console.log(response.data);
            fetchUsers();
        }
    }

    function addUser(){
        navigate('/signup')
    }

    function editUser(id) {
        navigate(`/signup/${id}`); // Navigate to AddBook component with the book ID for editing
      }

    
    return(
        <>
            <AdminNavbar />
            <div className='min-vh-100 mt-5' style={{backgroundColor: '#3333'}}> 
                <div className='text-end'>
                <button className='btn btn-primary my-3 me-3' onClick={addUser}>Add User</button>
                </div>
                <table className='table ms-2 table-light table-striped table-bordered'>
                    <thead>
                        <tr> 
                            <th>
                                No.
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Username
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => 
                            <tr key={user.user_id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {user.firstName}
                                </td>
                                <td>
                                    {user.lastName}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role} 
                                </td>
                                <td>
                                    <button className='btn btn-warning me-2' onClick={() => editUser(user.user_id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user.user_id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UserListTable