import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/loginPic.jpg';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='container-fluid bg-light min-vh-100'>
        <div >
            <h1 className='text-center mb-2'>Book List</h1>
            <ul className='row justify-content-center'>
                {books.map(book => (
                    <li  className="col-md-2 card text-center mb-2 me-3 " key={book.id}>
                        <div>
                            <img src={logo} alt='book image' className='img-fluid'></img>
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                            <button className='btn btn-primary mb-2'>Borrow</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default BookList;
