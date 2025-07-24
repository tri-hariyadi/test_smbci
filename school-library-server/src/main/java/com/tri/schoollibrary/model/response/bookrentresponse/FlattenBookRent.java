package com.tri.schoollibrary.model.response.bookrentresponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlattenBookRent {
    private Long id;

    @JsonProperty("due_date")
    private OffsetDateTime dueDate;

    @JsonProperty("rent_date")
    private OffsetDateTime rentDate;

    @JsonProperty("return_date")
    private OffsetDateTime returnDate;

    private StatusBookRent status;

    @JsonProperty("book_id")
    private Long bookId;

    private String isbn;

    private String title;

    private String author;

    private String publisher;

    @JsonProperty("cover_url")
    private String coverUrl;
}
