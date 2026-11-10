package com.university.erp.university.controller;

import com.university.erp.common.response.ApiResponse;
import com.university.erp.university.dto.CampusDto;
import com.university.erp.university.entity.Campus;
import com.university.erp.university.repository.CampusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/campuses")
@RequiredArgsConstructor
public class CampusController {

    private final CampusRepository campusRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'UNIVERSITY_ADMIN', 'REGISTRAR')")
    public ResponseEntity<ApiResponse<List<CampusDto>>> getCampuses(@RequestParam(required = false) String universityId) {
        List<Campus> list = (universityId != null) ?
                campusRepository.findByUniversityId(universityId) :
                campusRepository.findAll();

        List<CampusDto> dtos = list.stream().map(c -> CampusDto.builder()
                .id(c.getId())
                .universityId(c.getUniversityId())
                .code(c.getCode())
                .name(c.getName())
                .address(c.getAddress())
                .city(c.getCity())
                .state(c.getState())
                .country(c.getCountry())
                .isMain(c.isMain())
                .status(c.getStatus())
                .createdAt(c.getCreatedAt())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'UNIVERSITY_ADMIN')")
    public ResponseEntity<ApiResponse<CampusDto>> createCampus(@RequestBody CampusDto dto) {
        Campus c = Campus.builder()
                .universityId(dto.getUniversityId())
                .code(dto.getCode())
                .name(dto.getName())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .country(dto.getCountry())
                .isMain(dto.isMain())
                .status("ACTIVE")
                .build();

        Campus saved = campusRepository.save(c);

        CampusDto result = CampusDto.builder()
                .id(saved.getId())
                .universityId(saved.getUniversityId())
                .code(saved.getCode())
                .name(saved.getName())
                .address(saved.getAddress())
                .city(saved.getCity())
                .state(saved.getState())
                .country(saved.getCountry())
                .isMain(saved.isMain())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();

        return ResponseEntity.ok(ApiResponse.success("Campus created successfully", result));
    }
}
