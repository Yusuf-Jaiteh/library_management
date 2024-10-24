package learn.data;

import learn.models.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, java.lang.Long> {
    @Query("SELECT b FROM Borrow b WHERE b.user.id = :userId")
    List<Borrow> findByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM Borrow b WHERE b.book.id = :bookId")
    List<Borrow> findByBookId(@Param("bookId") Long bookId);
}
