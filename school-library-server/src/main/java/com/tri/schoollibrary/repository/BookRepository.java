package com.tri.schoollibrary.repository;

import com.tri.schoollibrary.entity.Book;
import com.tri.schoollibrary.model.response.BookListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

    @Query(
            "SELECT " +
                    "new com.tri.schoollibrary.model.response.BookListResponse(" +
                    "b.id, b.isbn, b.title, b.author, b.publisher, b.publishedYear, b.coverUrl, b.category, b.totalCopies, b.availableCopies, b.createdAt" +
                    ")" +
                    " FROM Book b"
    )
    List<BookListResponse> findAllBook();

    @Query("""
                SELECT new com.tri.schoollibrary.model.response.BookListResponse(
                    b.id, b.isbn, b.title, b.author, b.publisher, b.publishedYear, b.coverUrl, b.category, b.totalCopies, b.availableCopies, b.createdAt
                ) FROM Book b
                WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(b.publisher) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<BookListResponse> searchBooks(@Param("keyword") String keyword);
}
