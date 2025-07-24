package com.tri.schoollibrary.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class MapperUtils {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static Map<String, Object> convertToMap(Object obj) {
        return mapper.convertValue(obj, new TypeReference<Map<String, Object>>() {});
    }
}
