package learn.controllers;

import learn.domain.BorrowService;
import learn.domain.Result;
import learn.models.Borrow;
import learn.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/borrows")
public class BorrowController {

    private BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Borrow> findById(@PathVariable java.lang.Long id) {
        Optional<Borrow> borrow = borrowService.findById(id);
        if (borrow.isPresent()) {
            return ResponseEntity.ok(borrow.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Borrow>> findByUser(@PathVariable User user) {
        List<Borrow> borrows = borrowService.findByUser(user);
        if (!borrows.isEmpty()) {
            return ResponseEntity.ok(borrows);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Borrow>> findByBook(@PathVariable User book) {
        List<Borrow> borrows = borrowService.findByBook(book);
        if (!borrows.isEmpty()) {
            return ResponseEntity.ok(borrows);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Borrow>> findAll() {
        List<Borrow> borrows = borrowService.findAll();
        return ResponseEntity.ok(borrows);
    }

    @PostMapping
    public ResponseEntity<Result<Borrow>> addBorrow(@RequestBody Borrow borrow) {
        Result<Borrow> result = borrowService.addBorrow(borrow);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result<Borrow>> update(@PathVariable java.lang.Long id, @RequestBody Borrow borrow) {
        if (id != borrow.getId()) {
            return ResponseEntity.badRequest().build();
        }
        Result<Borrow> result = borrowService.updateBorrow(borrow);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Result<Borrow>> deleteById(@PathVariable java.lang.Long id) {
        Result<Borrow> result = borrowService.deleteById(id);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
}
