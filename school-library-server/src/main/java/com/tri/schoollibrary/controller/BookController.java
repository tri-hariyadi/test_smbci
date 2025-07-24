package com.tri.schoollibrary.controller;

import com.tri.schoollibrary.model.WebResponse;
import com.tri.schoollibrary.model.response.BookListResponse;
import com.tri.schoollibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public WebResponse<List<BookListResponse>> getBooks() {
        List<BookListResponse> books = bookService.getBooks();
        return WebResponse.<List<BookListResponse>>builder().data(books).status(true).message("success").build();
    }

    @GetMapping("/search")
    public WebResponse<List<BookListResponse>> searchBooks(
            @RequestParam(required = false) String keyword
    ) {
        List<BookListResponse> books = bookService.searchBooks(keyword);
        return WebResponse.<List<BookListResponse>>builder().data(books).status(true).message("success").build();
    }
}
