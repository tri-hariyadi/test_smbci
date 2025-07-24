package com.tri.schoollibrary.service.impl;

import com.tri.schoollibrary.entity.Book;
import com.tri.schoollibrary.entity.BookRental;
import com.tri.schoollibrary.entity.User;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import com.tri.schoollibrary.exceptions.BadRequestException;
import com.tri.schoollibrary.model.request.BookRentRequest;
import com.tri.schoollibrary.model.response.bookrentresponse.BookDTO;
import com.tri.schoollibrary.model.response.bookrentresponse.BookRentResponse;
import com.tri.schoollibrary.repository.BookRentRepository;
import com.tri.schoollibrary.repository.BookRepository;
import com.tri.schoollibrary.repository.UserRepository;
import com.tri.schoollibrary.service.BookRentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookRentServiceImpl implements BookRentService {

    private final BookRentRepository bookRentRepository;

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    private final ValidationService validationService;

    @Override
    public void create(BookRentRequest bookRentRequest) {
        validationService.validate(bookRentRequest);

        User user = userRepository.findById(bookRentRequest.getUserId().toString())
                .orElseThrow(() -> new BadRequestException("User not found"));

        Book book = bookRepository.findById(bookRentRequest.getBookId().toString())
                .orElseThrow(() -> new BadRequestException("Book not found"));

        BookRental bookRental = new BookRental();
        bookRental.setUser(user);
        bookRental.setBook(book);
        bookRental.setDueDate(bookRentRequest.getDueDate());
        bookRental.setReturnDate(bookRentRequest.getReturnDate());
        if (bookRentRequest.getStatus() == null) {
            bookRental.setStatus(StatusBookRent.BORROWED);
        } else if (bookRentRequest.getStatus().toString().isEmpty() || bookRentRequest.getStatus().toString().isBlank()) {
            bookRental.setStatus(StatusBookRent.BORROWED);
        } else {
            bookRental.setStatus(bookRentRequest.getStatus());
        }

        bookRentRepository.save(bookRental);
    }

    @Override
    public List<BookRentResponse> getBooksRent(Long userId) {
        return bookRentRepository.findBookRentByUser(userId).stream()
                .map(r -> new BookRentResponse(
                        r.getId(),
                        r.getDueDate(),
                        r.getRentDate(),
                        r.getReturnDate(),
                        r.getStatus(),
                        new BookDTO(
                                r.getBookId(),
                                r.getIsbn(),
                                r.getTitle(),
                                r.getAuthor(),
                                r.getPublisher(),
                                r.getCoverUrl()
                        )
                )).toList();
    }

    @Override
    public void update(Long id, BookRentRequest bookRentRequest) {
        validationService.validate(bookRentRequest);

        BookRental dataBookRental = bookRentRepository.findById(String.valueOf(id))
                .map(rental -> ResponseEntity.ok(rental))
                .orElse(ResponseEntity.notFound().build()).getBody();

        BookRental bookRental = new BookRental();
        bookRental.setReturnDate(bookRentRequest.getReturnDate());

        long daysLate = ChronoUnit.DAYS.between(dataBookRental.getDueDate(), bookRentRequest.getReturnDate());
        if (daysLate > 0) {
            bookRental.setStatus(StatusBookRent.LATE);
        } else {
            bookRental.setStatus(StatusBookRent.RETURNED);
        }

        bookRentRepository.updateBookRentById(id, bookRentRequest.getReturnDate(), bookRental.getStatus());
    }
}
