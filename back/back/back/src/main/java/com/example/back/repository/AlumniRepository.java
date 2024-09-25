package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.back.model.Alumni;

import java.util.List;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    List<Alumni> findByYearOfJoining(String yearOfJoining);
    List<Alumni> findByYearOfJoiningAndDept(String yearOfJoining, String dept);
    List<Alumni> findByDept(String dept);
    List<Alumni> findByDegree(String degree);
    List<Alumni> findByYearOfPassing(String year);
    Alumni findByEmailAndPassword(String email, String password);
    Alumni findByEmail(String email);
}