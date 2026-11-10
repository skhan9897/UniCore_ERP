package com.university.erp.auth;

import com.university.erp.auth.controller.AuthController;
import com.university.erp.auth.dto.LoginRequest;
import com.university.erp.auth.entity.Role;
import com.university.erp.auth.entity.User;
import com.university.erp.auth.repository.UserRepository;
import com.university.erp.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthController authController;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        Role role = Role.builder()
                .id("r-super-admin")
                .name("ROLE_SUPER_ADMIN")
                .displayName("Super Admin")
                .build();

        sampleUser = User.builder()
                .id("usr-1")
                .tenantId("t-1")
                .universityId("u-1")
                .campusId("c-1")
                .username("superadmin")
                .email("admin@unicoreerp.com")
                .firstName("System")
                .lastName("SuperAdmin")
                .userType("SUPER_ADMIN")
                .status("ACTIVE")
                .roles(Set.of(role))
                .build();
    }

    @Test
    void testLoginSuccess() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("superadmin");
        loginRequest.setPassword("admin123");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(userRepository.findByUsername("superadmin")).thenReturn(Optional.of(sampleUser));
        when(tokenProvider.generateToken(any(), any(), any(), any())).thenReturn("mock-jwt-token");

        var response = authController.login(loginRequest);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody().isSuccess());
        assertEquals("mock-jwt-token", response.getBody().getData().getToken());
        assertEquals("superadmin", response.getBody().getData().getUser().getUsername());
    }
}
