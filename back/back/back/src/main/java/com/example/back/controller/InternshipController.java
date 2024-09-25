package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.back.model.Internship;
import com.example.back.services.InternshipService;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

  @Autowired
  private final InternshipService internshipService;

  public InternshipController(InternshipService internshipService) {
    this.internshipService = internshipService;
  }

  @GetMapping
  public List<Internship> getAllInternships() {
    return internshipService.getAllInternships();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
    return internshipService.getInternshipById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Internship addInternship(@RequestBody Internship internship) {
    return internshipService.addInternship(internship);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Internship> updateInternship(@PathVariable Long id, @RequestBody Internship internshipDetails)
      throws Exception {
    return ResponseEntity.ok(internshipService.updateInternship(id, internshipDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
    internshipService.deleteInternship(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/type/{internshipType}")
  public List<Internship> getInternshipsByType(@PathVariable String internshipType) {
    return internshipService.getInternshipsByType(internshipType);
  }

  @GetMapping("/company/{company}")
  public List<Internship> getInternshipsByCompany(@PathVariable String company) {
    return internshipService.getInternshipsByCompany(company);
  }
}
