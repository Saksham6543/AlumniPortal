package com.example.back.services;

import com.example.back.model.Job;
import com.example.back.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> getJobsByType(String[] types) {
        List<String> typeList = Arrays.asList(types);
        return jobRepository.findByTypeIn(typeList);
    }

    public List<Job> getJobsPostedByMe() {
        return jobRepository.findByPostedByMe(true);
    }



    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    // Ensuring search parameters are passed to the repository
    public List<Job> searchJobs(String companyName, String jobTitle, String location) {
        return jobRepository.searchJobs(companyName, jobTitle, location);
    }
}
