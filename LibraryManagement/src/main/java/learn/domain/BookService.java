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

    public Book addBook(Book book){
        return bookRepository.save(book);
    }

//    public boolean update(Book book){
//        return bookRepository.update(book);
//    }

    public void deleteBook(Long id){
         bookRepository.deleteById(id);
    }
}
