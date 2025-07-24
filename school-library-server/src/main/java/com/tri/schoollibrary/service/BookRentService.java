package com.tri.schoollibrary.service;

import com.tri.schoollibrary.model.request.BookRentRequest;
import com.tri.schoollibrary.model.response.bookrentresponse.BookRentResponse;
import com.tri.schoollibrary.model.response.bookrentresponse.FlattenBookRent;

import java.util.List;

public interface BookRentService {
    void create(BookRentRequest bookRentRequest);

    List<BookRentResponse> getBooksRent(Long userId);

    void update(Long id, BookRentRequest bookRentRequest);
}
