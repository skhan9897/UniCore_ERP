package com.university.erp.config;

import com.university.erp.auth.entity.Role;
import com.university.erp.auth.entity.User;
import com.university.erp.auth.repository.RoleRepository;
import com.university.erp.auth.repository.UserRepository;
import com.university.erp.university.entity.Campus;
import com.university.erp.university.entity.Tenant;
import com.university.erp.university.entity.University;
import com.university.erp.university.repository.CampusRepository;
import com.university.erp.university.repository.TenantRepository;
import com.university.erp.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TenantRepository tenantRepository;
    private final UniversityRepository universityRepository;
    private final CampusRepository campusRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role superAdminRole = Role.builder()
                    .id("r-super-admin")
                    .name("ROLE_SUPER_ADMIN")
                    .displayName("Super Admin")
                    .description("System-wide Super Administrator")
                    .isSystemRole(true)
                    .build();

            Role univAdminRole = Role.builder()
                    .id("r-univ-admin")
                    .name("ROLE_UNIVERSITY_ADMIN")
                    .displayName("University Admin")
                    .description("University Level Administrator")
                    .isSystemRole(true)
                    .build();

            roleRepository.save(superAdminRole);
            roleRepository.save(univAdminRole);
        }

        if (tenantRepository.count() == 0) {
            Tenant defaultTenant = Tenant.builder()
                    .id("t-default-001")
                    .tenantCode("TENANT-UNICORE")
                    .name("UniCore Global Enterprise")
                    .status("ACTIVE")
                    .build();
            tenantRepository.save(defaultTenant);
        }

        if (universityRepository.count() == 0) {
            University defaultUniv = University.builder()
                    .id("u-apex-001")
                    .tenantId("t-default-001")
                    .code("APEX-UNIV")
                    .name("Apex Global University")
                    .tagline("Excellence in Education & Innovation")
                    .contactEmail("admin@apexuniversity.edu")
                    .contactPhone("+1-800-555-0199")
                    .website("https://apexuniversity.edu")
                    .status("ACTIVE")
                    .build();
            universityRepository.save(defaultUniv);
        }

        if (campusRepository.count() == 0) {
            Campus mainCampus = Campus.builder()
                    .id("c-main-001")
                    .universityId("u-apex-001")
                    .code("CAMPUS-MAIN")
                    .name("Apex Main Campus")
                    .address("100 University Boulevard")
                    .city("Tech City")
                    .state("State")
                    .country("USA")
                    .isMain(true)
                    .status("ACTIVE")
                    .build();
            campusRepository.save(mainCampus);
        }

        if (!userRepository.existsByUsername("superadmin")) {
            Role superAdminRole = roleRepository.findByName("ROLE_SUPER_ADMIN").orElse(null);

            User superAdmin = User.builder()
                    .id("usr-super-admin")
                    .tenantId("t-default-001")
                    .universityId("u-apex-001")
                    .campusId("c-main-001")
                    .username("superadmin")
                    .email("superadmin@unicoreerp.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("SuperAdmin")
                    .phoneNumber("+1-800-000-0000")
                    .userType("SUPER_ADMIN")
                    .status("ACTIVE")
                    .roles(superAdminRole != null ? Set.of(superAdminRole) : Set.of())
                    .build();

            userRepository.save(superAdmin);
        }
    }
}
