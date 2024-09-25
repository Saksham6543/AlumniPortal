package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.back.model.Donation;
import com.example.back.repository.DonationRepository;

@Service
public class DonationService {

  @Autowired
  private final DonationRepository donationRepository;

  public DonationService(DonationRepository donationRepository) {
    this.donationRepository = donationRepository;
  }

  public List<Donation> getAllDonations() {
    return donationRepository.findAll();
  }

  public Optional<Donation> getDonationById(Long id) {
    return donationRepository.findById(id);
  }

  public Donation addDonation(Donation donation) {
    return donationRepository.save(donation);
  }

  public Donation updateDonation(Long id, Donation donationDetails) throws  Exception {
    return donationRepository.findById(id)
        .map(donation -> {
          donation.setDonorName(donationDetails.getDonorName());
          donation.setEmail(donationDetails.getEmail());
          donation.setContactNumber(donationDetails.getContactNumber());
          donation.setAmount(donationDetails.getAmount());
          donation.setPaymentMethod(donationDetails.getPaymentMethod());
          donation.setDonationDate(donationDetails.getDonationDate());
          donation.setMessage(donationDetails.getMessage());
          return donationRepository.save(donation);
        }).orElseThrow(() -> new Exception("Donation not found with id " + id));
  }

  public void deleteDonation(Long id) {
    donationRepository.deleteById(id);
  }

  public List<Donation> getDonationsByDonorName(String donorName) {
    return donationRepository.findByDonorName(donorName);
  }

  public List<Donation> getDonationsByEmail(String email) {
    return donationRepository.findByEmail(email);
  }
}
