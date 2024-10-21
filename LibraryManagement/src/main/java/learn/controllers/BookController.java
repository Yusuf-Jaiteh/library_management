package learn.controllers;

import learn.domain.BookService;
import learn.models.Book;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public Optional<Book> findById(@PathVariable Long id){
        return bookService.findById(id);
    }

    @GetMapping
    public List<Book> findAll(){
        return bookService.findAll();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }

//    @PutMapping("/{id}")
//    public boolean update(@RequestBody Book book){
//        return bookService.update(book);
//    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        bookService.deleteBook(id);
    }

}
