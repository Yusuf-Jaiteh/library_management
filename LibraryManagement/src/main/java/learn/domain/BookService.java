package learn.domain;

import learn.data.BookRepository;
import learn.models.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Optional<Book> findById(Long id){
        return bookRepository.findById(id);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Result<Book> addBook(Book book){
        Result<Book> result = validate(book);
        if(!result.isSuccess()){
            return result;
        }
        result.setPayload(bookRepository.save(book));
        return result;
    }

    private Result<Book> validate(Book book) {
    }

    public Book updateBook(Long id, Book updatedBook) {
        if (updatedBook == null) {
            throw new IllegalArgumentException("Updated book cannot be null.");
        }
        if (updatedBook.getTitle() == null || updatedBook.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Book title cannot be null or empty.");
        }
        if (updatedBook.getAuthor() == null || updatedBook.getAuthor().isEmpty()) {
            throw new IllegalArgumentException("Book author cannot be null or empty.");
        }
        if (updatedBook.getGenre() == null || updatedBook.getGenre().isEmpty()) {
            throw new IllegalArgumentException("Book genre cannot be null or empty.");
        }
        if (updatedBook.getCopiesAvailable() < 0) {
            throw new IllegalArgumentException("Number of copies available cannot be negative.");
        }

        Optional<Book> existingBookOpt = bookRepository.findById(id);
        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setGenre(updatedBook.getGenre());
            existingBook.setCopiesAvailable(updatedBook.getCopiesAvailable());
            return bookRepository.save(existingBook);
        } else {
            throw new IllegalArgumentException("Book with id " + id + " does not exist.");
        }
    }

    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
