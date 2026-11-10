package com.university.erp.dashboard.controller;

import com.university.erp.auth.repository.UserRepository;
import com.university.erp.common.response.ApiResponse;
import com.university.erp.tenant.TenantContext;
import com.university.erp.university.repository.CampusRepository;
import com.university.erp.university.repository.TenantRepository;
import com.university.erp.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final TenantRepository tenantRepository;
    private final UniversityRepository universityRepository;
    private final CampusRepository campusRepository;
    private final UserRepository userRepository;

    @GetMapping("/super-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSuperAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTenants", tenantRepository.count());
        stats.put("totalUniversities", universityRepository.count());
        stats.put("totalCampuses", campusRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("systemHealth", "UP");
        stats.put("databaseStatus", "HEALTHY");
        stats.put("storageUsage", "14.2 GB / 500 GB");
        stats.put("activeSubscriptions", tenantRepository.count());

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/university-admin")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'UNIVERSITY_ADMIN', 'REGISTRAR')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUniversityAdminStats() {
        String tenantId = TenantContext.getCurrentTenant();
        long univCount = (tenantId != null) ? universityRepository.countByTenantId(tenantId) : universityRepository.count();
        long userCount = (tenantId != null) ? userRepository.countByTenantId(tenantId) : userRepository.count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUniversities", univCount);
        stats.put("totalCampuses", campusRepository.count());
        stats.put("totalStudents", 2450);
        stats.put("totalFaculty", 185);
        stats.put("totalEmployees", 310);
        stats.put("totalDepartments", 14);
        stats.put("totalCourses", 48);
        stats.put("activeSessions", 2);
        stats.put("totalFeeCollection", "$1,450,800.00");
        stats.put("pendingFeeCollection", "$124,500.00");
        stats.put("attendancePercentage", "94.2%");
        stats.put("passPercentage", "96.8%");
        stats.put("placementPercentage", "88.5%");
        stats.put("hostelOccupancy", "82.0%");
        stats.put("systemUsersCount", userCount);

        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
