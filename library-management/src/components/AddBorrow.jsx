import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';
import { useAuth } from './AuthContext';


function AddBorrow(){

    const [ users, setUsers] = useState([]);
    const [ books, setBooks] = useState([]);
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturDate] = useState('');
    const [user, setUser] = useState(null);
    const [book, setBook] = useState(null);
    const [borrowId, setBorrowId] = useState(null);
    const navigate = useNavigate();
    const { id: borrow_id } = useParams();
    const { userId, role } = useAuth();
    

    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
        if (borrow_id) {
          // Edit mode
          fetch(`http://localhost:8080/api/borrows/${borrow_id}`)
            .then(response => response.json())
            .then(data => {
              setBorrowId(data.borrow_id);
              setBook(data.book);
              setUser(data.user);
              setBorrowDate(data.borrowDate);
              setReturDate(data.returnDate);
            })
            .catch(error => console.error('Error fetching borrow:', error));
        }
      }, [borrow_id]);


    useEffect(() => {
            
        async function fetchBooks() {
            try {
                const response = await fetch('http://localhost:8080/api/users');
                
                if (response.ok) {
                    const result = await response.json();
                    setUsers(result);
                } else {
                    console.error("Failed to fetch data:", response.status);
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        }
        
        fetchBooks();
        
        // axios.get('http://localhost:8080/api/users')
        // .then(response => {
        //     setUsers(response.data);
        //     console.log(response.data);  // Log the data directly
        // })
        // .catch(error => {
        //     console.error(error);
        // });

    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/books')
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    


    async function handleSubmit(e) {
        e.preventDefault();

        let response;
    
        if (borrowId) {
            const borrowData = { borrow_id, user, book, borrowDate, returnDate};
          // Edit mode
          response = await fetch(`http://localhost:8080/api/borrows/${borrowId}`, {
            method: "PUT", // PUT for updating the borrow
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(borrowData),
          });
        } else {
            const borrowData = {user, book, borrowDate, returnDate};
          // Add mode
          response = await fetch('http://localhost:8080/api/borrows', {
            method: "POST", // POST for creating a new borrow
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(borrowData),
          });
        }
    
        if (response.ok) {
          const data = await response.json();
          { !borrow_id ? setNotificationMessage("Borrow created successfully!") : setNotificationMessage("Borrow updated successfully!")}
          setNotificationType("success");
          setTimeout(() => setNotificationMessage(null), 1000);
          setTimeout(() => navigate('/borrow-list'), 1000);
        } else {
          const errorData = await response.json();
          {!borrow_id ? 
            setNotificationMessage(errorData.messages || "Failed to create borrow.") : 
            setNotificationMessage(errorData.messages || "Failed to update borrrow.")
          }
          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 3000);
          console.error('Error saving borrow:', errorData);
        }
      }

    return(

        <>
            <div className="card min-vh-100 border-light bg-light m-5">
                <div className="card-header bg-secondary text-white">{borrowId ? 'Edit Borrow' : 'Add Borrow'}</div>
                <form onSubmit={handleSubmit} className="p-4">
                {notificationMessage && (
                         <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                             {notificationMessage}
                          </div>
            )}
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User:</label>
                        <select
                                className='form-control'
                                id="user"
                                name="user"
                                value={user ? user.user_id : ''}  // Set value as the user's id
                                onChange={(e) => {
                                    const selectedUser = users.find((user) => user.user_id === parseInt(e.target.value));
                                    setUser(selectedUser);  // Store the full user object
                                }}
                            >
                                <option value="">--Select User--</option>
                                {users
                                .filter(user => role !== 'Member' || user.user_id == userId)
                                .map((user) => (
                                    <option key={user.user_id} value={user.user_id}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="book" className="form-label">Book:</label>
                        <select
                                className='form-control'
                                id="book"
                                name="book"
                                value={book ? book.book_id : ''}  // Set value as the book's id
                                onChange={(e) => {
                                    const selectedBook = books.find((book) => book.book_id === parseInt(e.target.value));
                                    setBook(selectedBook);  // Store the full book object
                                }}
                            >
                                <option value="">--Select Book--</option>
                                {books.map((book) => (
                                    <option key={book.book_id} value={book.book_id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="borrowDate" className="form-label">Borrow Date:</label>
                        <input 
                            className="form-control"
                            type="date" 
                            name="borrowDate" 
                            id="borrowDate"
                            value={borrowDate}
                            onChange={(e) => setBorrowDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="returnDate" className="form-label">Return Date:</label>
                        <input 
                            className="form-control"
                            type="date" 
                            name="returnDate" 
                            id="returnDate"
                            value={returnDate}
                            onChange={(e) => setReturDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-grid gap-2">
                            <button 
                                type="button" 
                                onClick={handleSubmit} 
                                className="btn btn-primary"
                            >
                                {borrowId ? 'Update Borrow' : 'Add Borrow'}
                            </button>
                    </div>
                </form>
</div>

        </>
    )
}

export default AddBorrow