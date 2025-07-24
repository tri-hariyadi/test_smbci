package com.tri.schoollibrary.service.impl;

import com.tri.schoollibrary.entity.Book;
import com.tri.schoollibrary.model.response.BookListResponse;
import com.tri.schoollibrary.repository.BookRepository;
import com.tri.schoollibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

//    private final ValidationService validationService;

    @Override
    public List<BookListResponse> getBooks() {
        return bookRepository.findAllBook();
    }

    @Override
    public List<BookListResponse> searchBooks(String keyword) {
        return bookRepository.searchBooks(keyword);
    }
}
