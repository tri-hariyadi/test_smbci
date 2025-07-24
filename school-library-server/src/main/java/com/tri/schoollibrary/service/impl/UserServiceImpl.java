package com.tri.schoollibrary.service.impl;

import com.tri.schoollibrary.entity.User;
import com.tri.schoollibrary.entity.enums.Role;
import com.tri.schoollibrary.entity.enums.StatusBookRent;
import com.tri.schoollibrary.exceptions.UnauthorizedException;
import com.tri.schoollibrary.model.request.UserLoginRequest;
import com.tri.schoollibrary.model.request.UserRegisterRequest;
import com.tri.schoollibrary.model.response.UserLoginResponse;
import com.tri.schoollibrary.repository.UserRepository;
import com.tri.schoollibrary.security.BCrypt;
import com.tri.schoollibrary.security.JwtUtil;
import com.tri.schoollibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ValidationService validationService;

    @Override
    public UserLoginResponse register(UserRegisterRequest userRegisterRequest) {
        validationService.validate(userRegisterRequest);

        User user = new User();
        user.setEmail(userRegisterRequest.getEmail());
        user.setPassword(BCrypt.hashpw(userRegisterRequest.getPassword(), BCrypt.gensalt()));
        user.setFullName(userRegisterRequest.getFullName());

        if (userRegisterRequest.getRole() == null) {
            user.setRole(Role.MEMBER);
        } else if (userRegisterRequest.getRole().isEmpty() || userRegisterRequest.getRole().isBlank()) {
            user.setRole(Role.MEMBER);
        } else {
            user.setRole(Role.valueOf(userRegisterRequest.getRole()));
        }

        userRepository.save(user);

        Map<String, Object> claims = new HashMap<>(Map.ofEntries(
                Map.entry("user_id", user.getId()),
                Map.entry("full_name", user.getFullName()),
                Map.entry("email", user.getEmail()),
                Map.entry("role", user.getRole())
        ));
        String accessToken = new JwtUtil().generateToken(claims);

        return UserLoginResponse.builder().accessToken(accessToken).build();
    }

    @Override
    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        validationService.validate(userLoginRequest);

        User user = userRepository.findByEmail(userLoginRequest.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Username or password wrong"));

        if (BCrypt.checkpw(userLoginRequest.getPassword(), user.getPassword())) {
            Map<String, Object> claims = new HashMap<>(Map.ofEntries(
                    Map.entry("user_id", user.getId()),
                    Map.entry("full_name", user.getFullName()),
                    Map.entry("email", user.getEmail()),
                    Map.entry("role", user.getRole())
            ));
            String accessToken = new JwtUtil().generateToken(claims);

            return UserLoginResponse.builder().accessToken(accessToken).build();
        } else {
            throw new UnauthorizedException("Username or password wrong");
        }
    }
}
