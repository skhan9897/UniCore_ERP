package com.university.erp.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String id;
    private String tenantId;
    private String universityId;
    private String campusId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String userType;
    private String status;
    private Set<String> roles;
    private Set<String> permissions;
    private LocalDateTime lastLogin;
}
