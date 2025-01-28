package learn.domain;

import learn.data.BorrowRepository;
import learn.models.Borrow;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepository;

    public BorrowService(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }

    public Optional<Borrow> findById(java.lang.Long id){
        return borrowRepository.findById(id);
    }

    public List<Borrow> findByUser(Long userId){
        return borrowRepository.findByUserId(userId);
    }

    public List<Borrow> findByBook(Long bookId){
        return borrowRepository.findByBookId(bookId);
    }

    public List<Borrow> findAll(){
        return borrowRepository.findAll();
    }

    public Result<Borrow> addBorrow(Borrow borrow){
        Result<Borrow> result = validate(borrow);

        if(borrow.getBorrow_id() != null){
            result.addMessage("Borrow Id cannot be set for add operation", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        result.setPayload(borrowRepository.save(borrow));
        return result;
    }

    public Result<Borrow> updateBorrow(Borrow updatedBorrow) {
        Result<Borrow> result = validate(updatedBorrow);

        if (updatedBorrow.getBorrow_id() == null) {
            result.addMessage("BorrowId is required", ResultType.INVALID);
        }

        if (!result.isSuccess()) {
            return result;
        }

        java.lang.Long id = updatedBorrow.getBorrow_id();
        Optional<Borrow> existingBorrowOpt = borrowRepository.findById(id);
        if (existingBorrowOpt.isPresent()) {
            Borrow existingBorrow = existingBorrowOpt.get();
            existingBorrow.setUser(updatedBorrow.getUser());
            existingBorrow.setBook(updatedBorrow.getBook());
            existingBorrow.setBorrowDate(updatedBorrow.getBorrowDate());
            existingBorrow.setReturnDate(updatedBorrow.getReturnDate());
            result.setPayload(borrowRepository.save(existingBorrow));
        } else {
            result.addMessage("Borrow ID " + id + " not found.", ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Borrow> deleteById(java.lang.Long id){
        Result<Borrow> result = new Result<>();
        if (borrowRepository.existsById(id)) {
            borrowRepository.deleteById(id);
        } else {
            result.addMessage("Book ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Borrow> validate(Borrow borrow) {
        Result<Borrow> result = new Result<>();
        if (borrow == null) {
            result.addMessage("Borrow cannot be null", ResultType.INVALID);
            return result;
        }

        if (borrow.getBorrowDate() == null) {
            result.addMessage("DateOut is required", ResultType.INVALID);
        }

        if (borrow.getReturnDate() == null) {
            result.addMessage("Return Date is required", ResultType.INVALID);
        }

        if (borrow.getReturnDate() != null && borrow.getBorrowDate() != null) {
            if (borrow.getReturnDate().isBefore(borrow.getBorrowDate())) {
                result.addMessage("Return Date must be after Borrow Date", ResultType.INVALID);
            }
        }

        return result;
    }

}
