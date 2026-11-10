package com.university.erp.auth.controller;

import com.university.erp.auth.dto.LoginRequest;
import com.university.erp.auth.dto.LoginResponse;
import com.university.erp.auth.dto.UserDto;
import com.university.erp.auth.entity.User;
import com.university.erp.auth.repository.UserRepository;
import com.university.erp.common.response.ApiResponse;
import com.university.erp.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseGet(() -> userRepository.findByEmail(loginRequest.getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found")));

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = tokenProvider.generateToken(
                authentication,
                user.getTenantId(),
                user.getUniversityId(),
                user.getCampusId()
        );

        Set<String> roles = user.getRoles().stream()
                .map(r -> r.getName())
                .collect(Collectors.toSet());

        Set<String> permissions = user.getRoles().stream()
                .flatMap(r -> r.getPermissions().stream().map(p -> p.getCode()))
                .collect(Collectors.toSet());

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .tenantId(user.getTenantId())
                .universityId(user.getUniversityId())
                .campusId(user.getCampusId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .userType(user.getUserType())
                .status(user.getStatus())
                .roles(roles)
                .permissions(permissions)
                .lastLogin(user.getLastLogin())
                .build();

        LoginResponse loginResponse = LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(userDto)
                .build();

        return ResponseEntity.ok(ApiResponse.success("Login successful", loginResponse));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthenticated"));
        }

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<String> roles = user.getRoles().stream()
                .map(r -> r.getName())
                .collect(Collectors.toSet());

        Set<String> permissions = user.getRoles().stream()
                .flatMap(r -> r.getPermissions().stream().map(p -> p.getCode()))
                .collect(Collectors.toSet());

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .tenantId(user.getTenantId())
                .universityId(user.getUniversityId())
                .campusId(user.getCampusId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .userType(user.getUserType())
                .status(user.getStatus())
                .roles(roles)
                .permissions(permissions)
                .lastLogin(user.getLastLogin())
                .build();

        return ResponseEntity.ok(ApiResponse.success(userDto));
    }
}
