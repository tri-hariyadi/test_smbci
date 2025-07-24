package com.tri.schoollibrary.model.response.bookrentresponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO {

    @JsonProperty("book_id")
    private Long bookId;

    private String isbn;

    private String title;

    private String author;

    private String publisher;

    @JsonProperty("cover_url")
    private String coverUrl;
}
