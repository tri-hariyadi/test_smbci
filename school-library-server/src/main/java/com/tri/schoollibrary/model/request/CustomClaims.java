package com.tri.schoollibrary.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tri.schoollibrary.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public record CustomClaims(
        String email,

        String userId,

        Role role
) {

}
