package com.tri.schoollibrary.service;

import com.tri.schoollibrary.model.request.UserLoginRequest;
import com.tri.schoollibrary.model.request.UserRegisterRequest;
import com.tri.schoollibrary.model.response.UserLoginResponse;

import java.util.Map;

public interface UserService {
    UserLoginResponse register(UserRegisterRequest userRegisterRequest);

    UserLoginResponse login(UserLoginRequest userLoginRequest);
}
