package com.university.erp.university.repository;

import com.university.erp.university.entity.Campus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampusRepository extends JpaRepository<Campus, String> {

    List<Campus> findByUniversityId(String universityId);

    long countByUniversityId(String universityId);
}
