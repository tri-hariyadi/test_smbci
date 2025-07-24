package com.tri.schoollibrary.service;

import com.tri.schoollibrary.model.response.BookListResponse;

import java.util.List;

public interface BookService {
    List<BookListResponse> getBooks();
    List<BookListResponse> searchBooks(String keyword);
}
