package com.tri.schoollibrary.controller;

import com.tri.schoollibrary.model.WebResponse;
import com.tri.schoollibrary.model.request.UserLoginRequest;
import com.tri.schoollibrary.model.request.UserRegisterRequest;
import com.tri.schoollibrary.model.response.UserLoginResponse;
import com.tri.schoollibrary.service.UserService;
import com.tri.schoollibrary.utils.MapperUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/users")
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/register")
    public WebResponse<UserLoginResponse> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        UserLoginResponse resp = userService.register(userRegisterRequest);
        return WebResponse.<UserLoginResponse>builder().data(resp).status(true).message("success").build();
    }

    @PostMapping(path = "/login")
    public WebResponse<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        UserLoginResponse response = userService.login(userLoginRequest);
        return WebResponse.<UserLoginResponse>builder().data(response).status(true).message("success").build();
    }

    @GetMapping(path = "/verify")
    public WebResponse<Map<String, Object>> verifyToken(HttpServletRequest request) {
        Map<String, Object> claims = MapperUtils.convertToMap(request.getAttribute("claims"));
        return WebResponse.<Map<String, Object>>builder().data(claims).status(true).message("success").build();
    }
}
