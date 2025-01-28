import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/loginPic.jpg';
import AdminNavbar from './Navbars/Navbar';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function BookListTable(){

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { role } = useAuth();

    useEffect(() => {
        fetchBooks()
    }, [books]);

   
    function fetchBooks(){
        axios.get('http://localhost:8080/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }
    function deleteBook(id){
        const isDelete = confirm("Do you want to delete this book!");
        if(isDelete){
            const response = fetch(`http://localhost:8080/api/books/${id}` ,{
                method: "DELETE",
            });
            fetchBooks();
        }
    }

    function editBook(id) {
        navigate(`/add-book/${id}`); // Navigate to AddBook component with the book ID for editing
      }

    function addBook(){
        navigate('/add-book')
    }

    
    return(
        <>
             <AdminNavbar />
            <div className='min-vh-100 mt-5 mb-3'  style={{backgroundColor: '#3333'}}> 
                {role != "Member" && 
                    <div className='text-end'>
                    <button className='btn btn-primary my-3 me-3' onClick={addBook}>Add Book</button>
                </div>
                }
                {role === "Member" && <div style={{ marginBottom: '20px', color: '#3333'}}> .</div>}
                {books.length != 0 ? 
                <table className='table ms-2 table-light table-striped table-bordered'>
                    <thead>
                        <tr> 
                            <th>
                                No.
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Genre
                            </th>
                            <th>
                                No. of borrows
                            </th>
                            {role != 'Member' &&
                            <th>
                                Action
                            </th>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book, index) => 
                            <tr key={book.book_id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {book.title}
                                </td>
                                <td>
                                    {book.author}
                                </td>
                                <td>
                                    {book.genre}
                                </td>
                                <td>
                                    {book.borrows.length} borrows
                                </td>
                                {role != 'Member' &&
                                <td>
                                    <button className='btn btn-warning me-2' onClick={() => editBook(book.book_id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteBook(book.book_id)}>Delete</button>
                                </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </table> :
                <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                     <h1>There is no book available yet.</h1>
                </div>
                }

            </div>
        </>
    )
}

export default BookListTable