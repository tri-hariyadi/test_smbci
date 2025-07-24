package com.tri.schoollibrary.repository;

import com.tri.schoollibrary.entity.BookRental;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import com.tri.schoollibrary.model.response.bookrentresponse.FlattenBookRent;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface BookRentRepository extends JpaRepository<BookRental, String> {

    @Query("""
        SELECT new com.tri.schoollibrary.model.response.bookrentresponse.FlattenBookRent(
            br.id,
            br.dueDate,
            br.rentDate,
            br.returnDate,
            br.status,
            b.id,
            b.isbn,
            b.title,
            b.author,
            b.publisher,
            b.coverUrl
        )
        FROM BookRental br
        JOIN br.book b
        WHERE br.user.id = :userId
    """)
    List<FlattenBookRent> findBookRentByUser(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE BookRental br SET br.returnDate = :returnDate, br.status = :status WHERE br.id = :id")
    void updateBookRentById(@Param("id") Long id, @Param("returnDate") OffsetDateTime returnDate, @Param("status") StatusBookRent status);
}
