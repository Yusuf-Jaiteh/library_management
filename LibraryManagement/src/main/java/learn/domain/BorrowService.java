package learn.domain;

import learn.data.BorrowRepository;
import learn.models.Borrow;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    private BorrowRepository borrowRepository;

    public BorrowService(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }

    public Optional<Borrow> findById(Long id){
        return borrowRepository.findById(id);
    }

    public List<Borrow> findAll(){
        return borrowRepository.findAll();
    }

    public Borrow addBorrow(Borrow borrow){
        return borrowRepository.save(borrow);
    }

    public void deleteById(Long id){
        borrowRepository.deleteById(id);
    }

}
