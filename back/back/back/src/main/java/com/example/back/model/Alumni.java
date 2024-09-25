package com.example.back.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Alumni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String gender;
    private LocalDate dob;
    private String role; 
    private String degree;
    private String dept;
    private String yearOfPassing; 
    private String mobile1;
    private String mobile2;
    private String email;
    private String alternateEmail;
    private String currentAddress;
    private String permanentAddress;
    private String country;
    private String state;
    private String city;
    private String workingStatus;
    private String currentOrganisation;
    private String currentPosition;
    private String yearOfJoining; 
    private String pastExperience;
    private String linkedin;
    private String facebook;
    private String instagram;
    private String website;
    private String password;
}