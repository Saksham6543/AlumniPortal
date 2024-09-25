// src/main/java/com/example/demo/repository/JobRepository.java
package com.example.back.repository;

import com.example.back.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    List<Job> findByTypeIn(List<String> types);
    
    List<Job> findByPostedByMe(boolean postedByMe);
    


    // Custom search query using optional parameters and handling null inputs properly
    @Query("SELECT j FROM Job j WHERE " +
           "(:companyName IS NULL OR LOWER(j.company) LIKE LOWER(CONCAT('%', :companyName, '%'))) AND " +
           "(:jobTitle IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :jobTitle, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Job> searchJobs(@Param("companyName") String companyName, 
                         @Param("jobTitle") String jobTitle, 
                         @Param("location") String location);
}
