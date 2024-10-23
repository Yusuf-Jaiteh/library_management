package learn.domain;

import learn.data.BookRepository;
import learn.models.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Optional<Book> findById(Long id){
        return bookRepository.findById(id);
    }

    public List<Book> findByTitle(String title){
        return bookRepository.findByTitle(title);
    }

    public List<Book> findByAuthor(String author){
        return bookRepository.findByAuthor(author);
    }

    public List<Book> findByGenre(String genre){
        return bookRepository.findByGenre(genre);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Result<Book> addBook(Book book){
        Result<Book> result = validate(book);

        if (book.getCopiesAvailable() == 0) {
            result.addMessage("Copies available must be greater than  0.", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }
        result.setPayload(bookRepository.save(book));
        return result;
    }

    public Result<Book> updateBook(Book updatedBook) {
        Result<Book> result = validate(updatedBook);

        if(!result.isSuccess()){
            return result;
        }

        Long id = updatedBook.getId();
        Optional<Book> existingBookOpt = bookRepository.findById(id);
        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setGenre(updatedBook.getGenre());
            existingBook.setCopiesAvailable(updatedBook.getCopiesAvailable());
            result.setPayload(bookRepository.save(existingBook));
        } else {
            result.addMessage("Book ID " + id + " not found.", ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Book> deleteBook(Long id) {
        Result<Book> result = new Result<>();
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            result.addMessage("Book ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Book> validate(Book book) {

        Result<Book> result = new Result<>();

        if (book == null) {
            result.addMessage("Book cannot be null.", ResultType.INVALID);
            return result;
        }

        if (book.getCopiesAvailable() < 0) {
            result.addMessage("Copies available must be greater than or equal to 0.", ResultType.INVALID);
        }

        if (book.getTitle() == null || book.getTitle().isBlank()) {
            result.addMessage("Title is required.", ResultType.INVALID);
        }

        if (book.getAuthor() == null || book.getAuthor().isBlank()) {
            result.addMessage("Author is required.", ResultType.INVALID);
        }

        if (book.getGenre() == null || book.getGenre().isBlank()) {
            result.addMessage("Genre is required.", ResultType.INVALID);
        }

        return result;
    }
}
