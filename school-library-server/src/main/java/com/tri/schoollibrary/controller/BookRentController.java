package com.tri.schoollibrary.controller;

import com.tri.schoollibrary.model.WebResponse;
import com.tri.schoollibrary.model.request.BookRentRequest;
import com.tri.schoollibrary.model.response.bookrentresponse.BookRentResponse;
import com.tri.schoollibrary.service.BookRentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/book_rentals")
public class BookRentController {

    private final BookRentService bookRentService;

    @PostMapping
    public WebResponse<String> rentBook(@RequestBody BookRentRequest bookRentRequest) {
        bookRentService.create(bookRentRequest);
        return WebResponse.<String>builder().data("OK").status(true).message("success").build();
    }

    @GetMapping(path = "/{userId}")
    public WebResponse<List<BookRentResponse>> getRentBooks(@PathVariable(name = "userId") String userId) {
        List<BookRentResponse> booksRent = bookRentService.getBooksRent(Long.valueOf(userId));
        return WebResponse.<List<BookRentResponse>>builder().data(booksRent).status(true).message("success").build();
    }

    @PatchMapping(path = "/{id}")
    public WebResponse<String> updateRentBook(@PathVariable(name = "id") String id, @RequestBody BookRentRequest bookRentRequest) {
        System.out.println("CALLUPDATE RENT");
        bookRentService.update(Long.valueOf(id), bookRentRequest);
        return WebResponse.<String>builder().data("OK").status(true).message("success").build();
    }
}
