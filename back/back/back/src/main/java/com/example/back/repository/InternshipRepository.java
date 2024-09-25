package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.back.model.Internship;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {
  List<Internship> findByInternshipType(String internshipType);

  List<Internship> findByCompany(String company);
}
