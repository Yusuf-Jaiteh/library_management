import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <div>
                            <img src='' alt='book image'></img>
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                            <button>Borrow</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
