package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.back.model.Internship;
import com.example.back.repository.InternshipRepository;

@Service
public class InternshipService {

    @Autowired
    private final InternshipRepository internshipRepository;

    public InternshipService(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Optional<Internship> getInternshipById(Long id) {
        return internshipRepository.findById(id);
    }

    public Internship addInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    public Internship updateInternship(Long id, Internship internshipDetails) throws  Exception {
        return internshipRepository.findById(id)
                .map(internship -> {
                    internship.setTitle(internshipDetails.getTitle());
                    internship.setCompany(internshipDetails.getCompany());
                    internship.setLocation(internshipDetails.getLocation());
                    internship.setInternshipType(internshipDetails.getInternshipType());
                    internship.setStartDate(internshipDetails.getStartDate());
                    internship.setEndDate(internshipDetails.getEndDate());
                    internship.setApplicationDeadline(internshipDetails.getApplicationDeadline());
                    internship.setDescription(internshipDetails.getDescription());
                    internship.setRequirements(internshipDetails.getRequirements());
                    internship.setContactEmail(internshipDetails.getContactEmail());
                    internship.setContactPhone(internshipDetails.getContactPhone());
                    internship.setApplicationLink(internshipDetails.getApplicationLink());
                    return internshipRepository.save(internship);
                }).orElseThrow(() -> new Exception("Internship not found with id " + id));
    }

    public void deleteInternship(Long id) {
        internshipRepository.deleteById(id);
    }

    public List<Internship> getInternshipsByType(String internshipType) {
        return internshipRepository.findByInternshipType(internshipType);
    }

    public List<Internship> getInternshipsByCompany(String company) {
        return internshipRepository.findByCompany(company);
    }
}