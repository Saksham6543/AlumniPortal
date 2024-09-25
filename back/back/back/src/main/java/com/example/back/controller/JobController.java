package com.example.back.controller;

import com.example.back.model.Job;
import com.example.back.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000") 
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Optional<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    @GetMapping("/type/{type}")
    public List<Job> getJobsByType(@PathVariable String type) {
        String[] types = type.split(",");
        return jobService.getJobsByType(types);
    }

    @GetMapping("/posted-by-me")
    public List<Job> getJobsPostedByMe() {
        return jobService.getJobsPostedByMe();
    }



    @PostMapping("/post")
    public Job createJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }

    // New endpoint for search functionality
    @GetMapping("/search")
    public List<Job> searchJobs(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String location) {
        return jobService.searchJobs(companyName, jobTitle, location);
    }
}
