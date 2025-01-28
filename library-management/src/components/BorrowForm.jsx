

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
        <>
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <label className='' htmlFor="user">Select User:</label>
                <select
                    className=''
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

        {/* The codes below are for bootstrap grid demo. To understand how it works*/}

        <div className=''>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='p-3 border bg-light'>Column 1</div>
                </div>
                <div className='col-md-6 '>
                    <div className='p-3 border bg-light'>Column 2</div>
                </div>
                <div className='col-md-3 '>
                    <div className='p-3 border bg-light'>Column 3</div>
                </div>
                <div className='col-md-4'>
                    <div className='p-3 border bg-light'>Column 4</div>
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm'>1 of 2</div>
            <div className='col-sm'>2 of 2</div>
        </div>
        </>
       
    );
}

export default BorrowForm


