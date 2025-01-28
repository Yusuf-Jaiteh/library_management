import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/loginPic.jpg';
import AdminNavbar from './Navbars/Navbar';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function BorrowListTable(){

    const [borrows, setBorrows] = useState([]);
    const navigate = useNavigate();
    const { userId, role } = useAuth();

    useEffect(() => {
        fetchBorrows()
    }, [borrows]);

   
    function fetchBorrows(){
        axios.get('http://localhost:8080/api/borrows')
            .then(response => setBorrows(response.data))
            .catch(error => console.error(error));
    }
    function deleteBorrow(id){
        const isDelete = confirm("Do you want to delete this borrow!");
        if(isDelete){
            const response = fetch(`http://localhost:8080/api/borrows/${id}` ,{
                method: "DELETE",
            });
            fetchBorrows();
        }
    }

    function editBorrow(id) {
        navigate(`/add-borrow/${id}`); 
      }

    function addBorrow(){
        navigate('/add-borrow')
    }

    
    return(
        <>
            <AdminNavbar />
            <div className='min-vh-100 mt-5' style={{backgroundColor: '#3333'}}> 
                    <div className='text-end'>
                        <button className='btn btn-primary my-3 me-3' onClick={addBorrow}>Add Borrow</button>
                    </div>
                {borrows.length != 0 ? 
                <table className='table ms-2 table-light table-striped table-bordered'>
                    <thead>
                        <tr> 
                            <th>
                                Borrow No.
                            </th>
                            <th>
                                Borrower's Name
                            </th>
                            <th>
                                Borrower's Username
                            </th>
                            <th>
                                Borrow Date
                            </th>
                            <th>
                                Return Date
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                            {borrows
                                .filter(borrow => role !== 'Member' || borrow.user.user_id == userId)
                                .map((borrow, index) => (
                                    <tr key={borrow.borrow_id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {borrow.user.firstName} {borrow.user.lastName}
                                        </td>
                                        <td>
                                            {borrow.user.email}
                                        </td>
                                        <td>
                                            {borrow.borrowDate}
                                        </td>
                                        <td>
                                            {borrow.returnDate}
                                        </td>
                                        <td>
                                            <button className='btn btn-warning me-2' onClick={() => editBorrow(borrow.borrow_id)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => deleteBorrow(borrow.borrow_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table> :
                <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                     <h1>No book is borrowed yet.</h1>
                </div>
                }

            </div>
        </>
    )
}

export default BorrowListTable