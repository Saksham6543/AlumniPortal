package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.back.model.Donation;
import com.example.back.services.DonationService;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

  @Autowired
  private final DonationService donationService;

  public DonationController(DonationService donationService) {
    this.donationService = donationService;
  }

  @GetMapping
  public List<Donation> getAllDonations() {
    return donationService.getAllDonations();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
    return donationService.getDonationById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Donation addDonation(@RequestBody Donation donation) {
    return donationService.addDonation(donation);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @RequestBody Donation donationDetails) throws  Exception{
    return ResponseEntity.ok(donationService.updateDonation(id, donationDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
    donationService.deleteDonation(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/donor/{donorName}")
  public List<Donation> getDonationsByDonorName(@PathVariable String donorName) {
    return donationService.getDonationsByDonorName(donorName);
  }

  @GetMapping("/email/{email}")
  public List<Donation> getDonationsByEmail(@PathVariable String email) {
    return donationService.getDonationsByEmail(email);
  }
}
