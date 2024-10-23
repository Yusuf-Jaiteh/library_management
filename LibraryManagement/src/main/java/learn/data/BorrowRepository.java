package learn.data;

import learn.models.Borrow;
import learn.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, java.lang.Long> {
    List<Borrow> findByUser(User userId);
    List<Borrow> findByBook(User bookId);
}
