package com.example.back.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donorName;
    private String email;
    private String contactNumber;
    private Double amount;
    private String paymentMethod; // e.g., Credit Card, PayPal, Bank Transfer
    private LocalDate donationDate;
    private String message; // Optional message from the donor
}
