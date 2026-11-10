package com.university.erp.university.controller;

import com.university.erp.common.response.ApiResponse;
import com.university.erp.tenant.TenantContext;
import com.university.erp.university.dto.UniversityDto;
import com.university.erp.university.entity.University;
import com.university.erp.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/universities")
@RequiredArgsConstructor
public class UniversityController {

    private final UniversityRepository universityRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'UNIVERSITY_ADMIN', 'REGISTRAR')")
    public ResponseEntity<ApiResponse<List<UniversityDto>>> getAllUniversities() {
        String tenantId = TenantContext.getCurrentTenant();
        List<University> list = (tenantId != null) ?
                universityRepository.findByTenantId(tenantId) :
                universityRepository.findAll();

        List<UniversityDto> dtos = list.stream().map(u -> UniversityDto.builder()
                .id(u.getId())
                .tenantId(u.getTenantId())
                .code(u.getCode())
                .name(u.getName())
                .logoUrl(u.getLogoUrl())
                .tagline(u.getTagline())
                .contactEmail(u.getContactEmail())
                .contactPhone(u.getContactPhone())
                .website(u.getWebsite())
                .address(u.getAddress())
                .accreditationDetails(u.getAccreditationDetails())
                .status(u.getStatus())
                .createdAt(u.getCreatedAt())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<UniversityDto>> createUniversity(@RequestBody UniversityDto dto) {
        String tenantId = TenantContext.getCurrentTenant() != null ? TenantContext.getCurrentTenant() : dto.getTenantId();
        if (tenantId == null) {
            tenantId = "t-default-001";
        }

        University u = University.builder()
                .tenantId(tenantId)
                .code(dto.getCode())
                .name(dto.getName())
                .logoUrl(dto.getLogoUrl())
                .tagline(dto.getTagline())
                .contactEmail(dto.getContactEmail())
                .contactPhone(dto.getContactPhone())
                .website(dto.getWebsite())
                .address(dto.getAddress())
                .accreditationDetails(dto.getAccreditationDetails())
                .status("ACTIVE")
                .build();

        University saved = universityRepository.save(u);

        UniversityDto result = UniversityDto.builder()
                .id(saved.getId())
                .tenantId(saved.getTenantId())
                .code(saved.getCode())
                .name(saved.getName())
                .logoUrl(saved.getLogoUrl())
                .tagline(saved.getTagline())
                .contactEmail(saved.getContactEmail())
                .contactPhone(saved.getContactPhone())
                .website(saved.getWebsite())
                .address(saved.getAddress())
                .accreditationDetails(saved.getAccreditationDetails())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();

        return ResponseEntity.ok(ApiResponse.success("University created successfully", result));
    }
}
