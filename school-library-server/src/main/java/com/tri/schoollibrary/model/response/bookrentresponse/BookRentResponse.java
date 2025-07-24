package com.tri.schoollibrary.model.response.bookrentresponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookRentResponse {

    private Long id;

    @JsonProperty("due_date")
    private OffsetDateTime dueDate;

    @JsonProperty("rent_date")
    private OffsetDateTime rentDate;

    @JsonProperty("return_date")
    private OffsetDateTime returnDate;

    private StatusBookRent status;

    private BookDTO book;

//    private BookDTO book;

//    private String isbn;
//
//    private String title;
//
//    private String author;
//
//    private String publisher;
//
//    @JsonProperty("cover_url")
//    private String coverUrl;
}
