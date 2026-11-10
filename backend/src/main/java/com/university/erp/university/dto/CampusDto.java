package com.university.erp.university.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampusDto {

    private String id;
    private String universityId;
    private String code;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private boolean isMain;
    private String status;
    private LocalDateTime createdAt;
}
