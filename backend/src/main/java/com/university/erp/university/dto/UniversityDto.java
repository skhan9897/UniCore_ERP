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
public class UniversityDto {

    private String id;
    private String tenantId;
    private String code;
    private String name;
    private String logoUrl;
    private String tagline;
    private String contactEmail;
    private String contactPhone;
    private String website;
    private String address;
    private String accreditationDetails;
    private String status;
    private LocalDateTime createdAt;
}
