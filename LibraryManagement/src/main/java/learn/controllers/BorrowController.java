package learn.controllers;

import learn.data.BorrowRepository;
import learn.domain.BorrowService;
import learn.models.Borrow;
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
    public Optional<Borrow> findById(@PathVariable Long id){
        return borrowService.findById(id);
    }

    @GetMapping
    public List<Borrow> findAll(){
        return borrowService.findAll();
    }

    @PostMapping
    public Borrow addBorrow(@RequestBody Borrow borrow){
        return borrowService.addBorrow(borrow);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        borrowService.deleteById(id);
    }
}
