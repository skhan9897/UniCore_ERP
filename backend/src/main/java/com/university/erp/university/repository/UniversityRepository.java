package com.university.erp.university.repository;

import com.university.erp.university.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University, String> {

    List<University> findByTenantId(String tenantId);

    Optional<University> findByTenantIdAndCode(String tenantId, String code);

    long countByTenantId(String tenantId);
}
