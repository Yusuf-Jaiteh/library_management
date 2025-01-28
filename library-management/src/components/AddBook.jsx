import { useState, useEffect  } from "react"
import { useNavigate, useParams  } from 'react-router-dom';


function AddBook(){
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [copiesAvailable, setNumOfCopies] = useState('');
    const [bookId, setBookId] = useState(null);
    const navigate = useNavigate();
    const { id: book_id } = useParams();

    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
        if (book_id) {
          // Edit mode
          fetch(`http://localhost:8080/api/books/${book_id}`)
            .then(response => response.json())
            .then(data => {
              setBookId(data.book_id);
              setTitle(data.title);
              setAuthor(data.author);
              setGenre(data.genre);
              setNumOfCopies(data.copiesAvailable);
            })
            .catch(error => console.error('Error fetching book:', error));
        }
      }, [book_id]);
      

      async function handleSubmit(e) {
        e.preventDefault();

        let response;
    
        if (bookId) {
            const book = {book_id, title, author, genre, copiesAvailable };
          // Edit mode
          response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
            method: "PUT", // PUT for updating the book
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
          });
        } else {
            const book = { title, author, genre, copiesAvailable };
          // Add mode
          response = await fetch('http://localhost:8080/api/books', {
            method: "POST", // POST for creating a new book
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
          });
        }
    
        if (response.ok) {
          const data = await response.json();
          { !book_id ? setNotificationMessage("Book created successfully!") : setNotificationMessage("Book updated successfully!")}
          setNotificationType("success");
          setTimeout(() => setNotificationMessage(null), 1000);
          setTimeout(() => navigate('/book-list-table'), 1000);
          
        } else {
          const errorData = await response.json();
          {!book_id ? 
            setNotificationMessage(errorData.messages || "Failed to create book.") : 
            setNotificationMessage(errorData.messages || "Failed to update book.")
          }
          
          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 3000);
          console.error('Error saving book:', errorData);
        }
      }
    


    return(
        <>
            <div className="card min-vh-100 border-light bg-light m-5">
                    <div className="card-header bg-secondary text-white">{bookId ? 'Edit Book' : 'Add Book'}</div>
                    <form action="" className="p-4">
                    {notificationMessage && (
                         <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                             {notificationMessage}
                          </div>
            )}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                                className="form-control" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                type="text" 
                                name="title" 
                                id="title" 
                                required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input 
                                className="form-control" 
                                value={author} 
                                onChange={(e) => setAuthor(e.target.value)} 
                                type="text" 
                                name="author" 
                                id="author" 
                                required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="genre" className="form-label">Genre</label>
                            <select 
                                className="form-select" 
                                value={genre} 
                                onChange={(e) => setGenre(e.target.value)} 
                                id="genre" 
                                required
                            >
                                <option value="FICTION">FICTION</option>
                                <option value="SCIENCE">SCIENCE</option>
                                <option value="HISTORY">HISTORY</option>
                                <option value="POLITICS">POLITICS</option>
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="numOfCopies" className="form-label">Number of Copies</label>
                            <input 
                                className="form-control" 
                                value={copiesAvailable} 
                                onChange={(e) => setNumOfCopies(e.target.value)} 
                                type="number" 
                                name="copies" 
                                id="numOfCopies" 
                                required 
                            />
                        </div>
                        
                      
                        <div className="d-grid gap-2">
                            <button 
                                type="button" 
                                onClick={handleSubmit} 
                                className="btn btn-primary"
                            >
                                {bookId ? 'Update Book' : 'Add Book'}
                            </button>
                        </div>
                    </form>
            </div>

           
        </>
    )
}

export default AddBook