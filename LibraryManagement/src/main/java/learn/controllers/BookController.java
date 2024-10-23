package learn.controllers;

import learn.domain.BookService;
import learn.domain.Result;
import learn.models.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id) {
        Optional<Book> book = bookService.findById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Book>> findByTitle(@PathVariable String title) {
        List<Book> book = bookService.findByTitle(title);
        if (!book.isEmpty()) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Book>> findByAuthor(@PathVariable String author) {
        List<Book> book = bookService.findByAuthor(author);
        if (!book.isEmpty()) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Book>> findByGenre(@PathVariable String genre) {
        List<Book> book = bookService.findByGenre(genre);
        if (!book.isEmpty()) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Book>> findAll() {
        List<Book> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Result<Book>> addBook(@RequestBody Book book) {
        Result<Book> result = bookService.addBook(book);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result<Book>> update(@PathVariable Long id, @RequestBody Book book) {
        if (id != book.getId()) {
            return ResponseEntity.badRequest().build();
        }
        Result<Book> result = bookService.updateBook(book);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Result<Book>> deleteById(@PathVariable Long id) {
        Result<Book> result = bookService.deleteBook(id);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
}
