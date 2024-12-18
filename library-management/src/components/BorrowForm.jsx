// import { useEffect, useState } from "react"

// function BorrowForm() {
//     const [user, setUser] = useState('');
//     const [book, setBook] = useState('');
//     const [users, setUsers] = useState([]);
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         // Populate users and books from some source
//         setUsers([
//             { id: 1, name: 'John Doe' },
//             { id: 2, name: 'Jane Smith' },
//         ]);
//         setBooks([
//             { id: 1, title: 'The Great Gatsby' },
//             { id: 2, title: '1984' },
//         ]);
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Selected User:', user);
//         console.log('Selected Book:', book);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="user">Select User:</label>
//                 <select
//                     id="user"
//                     value={user}
//                     onChange={(e) => setUser(e.target.value)}
//                 >
//                     <option value="">--Select User--</option>
//                     {users.map((user) => (
//                         <option key={user.id} value={user.id}>
//                             {user.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label htmlFor="book">Select Book:</label>
//                 <select
//                     id="book"
//                     value={book}
//                     onChange={(e) => setBook(e.target.value)}
//                 >
//                     <option value="">--Select Book--</option>
//                     {books.map((book) => (
//                         <option key={book.id} value={book.id}>
//                             {book.title}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// }

// export default BorrowForm

import React, { useState, useEffect } from 'react';

function BorrowForm() {
    const [user, setUser] = useState(null);  // Store full user object
    const [book, setBook] = useState(null);  // Store full book object
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Example data, in a real-world scenario, you might fetch this from an API
        setUsers([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ]);
        setBooks([
            { id: 1, title: 'The Great Gatsby' },
            { id: 2, title: '1984' },
        ]);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected User:', user);  // Logs the full user object
        console.log('Selected Book:', book);  // Logs the full book object
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="user">Select User:</label>
                <select
                    id="user"
                    value={user ? user.id : ''}  // Set value as the user's id
                    onChange={(e) => {
                        const selectedUser = users.find((user) => user.id === parseInt(e.target.value));
                        setUser(selectedUser);  // Store the full user object
                    }}
                >
                    <option value="">--Select User--</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="book">Select Book:</label>
                <select
                    id="book"
                    value={book ? book.id : ''}  // Set value as the book's id
                    onChange={(e) => {
                        const selectedBook = books.find((book) => book.id === parseInt(e.target.value));
                        setBook(selectedBook);  // Store the full book object
                    }}
                >
                    <option value="">--Select Book--</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default BorrowForm


