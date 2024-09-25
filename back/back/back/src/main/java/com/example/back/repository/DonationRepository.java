package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.back.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
  List<Donation> findByDonorName(String donorName);

  List<Donation> findByEmail(String email);
}
