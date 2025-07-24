package com.tri.schoollibrary.entity;

import com.tri.schoollibrary.entity.enums.StatusBookRent;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book_rentals")
public class BookRental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "rent_date")
    private OffsetDateTime rentDate = OffsetDateTime.now();

    @Column(name = "due_date", nullable = false)
    private OffsetDateTime dueDate;

    @Column(name = "return_date")
    private OffsetDateTime returnDate;

    @Enumerated(EnumType.STRING)
    private StatusBookRent status = StatusBookRent.BORROWED;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
