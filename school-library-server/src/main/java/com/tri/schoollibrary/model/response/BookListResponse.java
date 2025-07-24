package com.tri.schoollibrary.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
//@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookListResponse {

    private Long id;

    private String isbn;

    private String title;

    private String author;

    private String publisher;

    @JsonProperty("published_year")
    private Integer publishedYear;

    @JsonProperty("cover_url")
    private String coverUrl;

    private String category;

    @JsonProperty("total_copies")
    private Integer totalCopies;

    @JsonProperty("available_copies")
    private Integer availableCopies;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public BookListResponse(
        Long id,
        String isbn,
        String title,
        String author,
        String publisher,
        Integer publishedYear,
        String coverUrl,
        String category,
        Integer totalCopies,
        Integer availableCopies,
        LocalDateTime createdAt
    ) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publishedYear = publishedYear;
        this.coverUrl = coverUrl;
        this.category = category;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.createdAt = createdAt;
    }
}
