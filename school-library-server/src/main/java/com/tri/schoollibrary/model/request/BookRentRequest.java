package com.tri.schoollibrary.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import jakarta.validation.constraints.NotNull;
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
public class BookRentRequest {

    private Long id;

    @NotNull
    @JsonProperty("user_id")
    private Long userId;

    @NotNull
    @JsonProperty("book_id")
    private Long bookId;

    @NotNull
    @JsonProperty("due_date")
    private OffsetDateTime dueDate;

    @JsonProperty("return_date")
    private OffsetDateTime returnDate;

    private StatusBookRent status;
}
