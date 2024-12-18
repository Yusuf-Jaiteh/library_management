import { useEffect, useState } from "react"
import axios from 'axios';


function AddBorrow(){

    const [ users, setUsers] = useState([]);
    const [ books, setBooks] = useState([]);
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturDate] = useState('');
    const [user, setUser] = useState('');
    const [book, setBook] = useState('');


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

    


    async function handleSubmit(e){
        e.preventDefault();

        const borrowData = {user, book, borrowDate, returnDate};

        try{
            const response = await fetch('http://localhost:8080/api/borrows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(borrowData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Book borrowed successfully:', result);
                
            } else {
                const errorText = await response.text(); 
                console.error('Failed to borrow book:', errorText);
            }

        } catch(error){
            console.error("Error borrowing a book", error)
        }


    }

    

    
    

    return(

        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User: <input 
                                    type="text" 
                                    name="user" 
                                    id="user"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required>
                                </input>
                    </label>
                </div>

                <div>
                    <label>Book: <input 
                                    type="text" 
                                    name="book" 
                                    id="book"
                                    value={book}
                                    onChange={(e) => setBook(e.target.value)}
                                    required>
                                </input>
                    </label>
                </div>

                <div>
                    <label>Borrow Date: <input 
                                           type="date" 
                                           name="borrowDate" 
                                           id="borrowDate"
                                           value={borrowDate}
                                           onChange={(e) => setBorrowDate(e.target.value)}
                                           required>
                                        </input>
                    </label>
                </div>

                <div>
                    <label>Return Date: <input 
                                           type="date" 
                                           name="returnDate" 
                                           id="returnDate"
                                           value={returnDate}
                                           onChange={(e) => setReturDate(e.target.value)}
                                           required>
                                        </input>
                    </label>
                </div>
                <button type="submit">Submit</button>
                
            </form>
        </>
    )
}

export default AddBorrow