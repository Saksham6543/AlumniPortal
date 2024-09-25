package com.example.back.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Internship {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String company;
  private String location;
  private String internshipType; // e.g., Paid, Unpaid, Part-Time, Full-Time
  private LocalDate startDate;
  private LocalDate endDate;
  private LocalDate applicationDeadline;
  private String description;
  private String requirements;
  private String contactEmail;
  private String contactPhone;
  private String applicationLink;
}
