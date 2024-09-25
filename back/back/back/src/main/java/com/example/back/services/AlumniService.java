package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.back.model.Alumni;
import com.example.back.repository.AlumniRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlumniService {

    @Autowired
    private final AlumniRepository alumniRepository;

    public AlumniService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    public Optional<Alumni> getAlumniById(Long id) {
        return alumniRepository.findById(id);
    }

    public Alumni addAlumni(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    public Alumni updateAlumni(String email, Alumni alumniDetails) throws Exception {
        Alumni alumni = alumniRepository.findByEmail(email);
        alumni.setName(alumniDetails.getName());
        alumni.setGender(alumniDetails.getGender());
        alumni.setDob(alumniDetails.getDob());
        alumni.setRole(alumniDetails.getRole());
        alumni.setDegree(alumniDetails.getDegree());
        alumni.setDept(alumniDetails.getDept());
        alumni.setYearOfPassing(alumniDetails.getYearOfPassing());
        alumni.setMobile1(alumniDetails.getMobile1());
        alumni.setMobile2(alumniDetails.getMobile2());
        alumni.setEmail(alumniDetails.getEmail());
        alumni.setAlternateEmail(alumniDetails.getAlternateEmail());
        alumni.setCurrentAddress(alumniDetails.getCurrentAddress());
        alumni.setPermanentAddress(alumniDetails.getPermanentAddress());
        alumni.setCountry(alumniDetails.getCountry());
        alumni.setState(alumniDetails.getState());
        alumni.setCity(alumniDetails.getCity());
        alumni.setWorkingStatus(alumniDetails.getWorkingStatus());
        alumni.setCurrentOrganisation(alumniDetails.getCurrentOrganisation());
        alumni.setCurrentPosition(alumniDetails.getCurrentPosition());
        alumni.setYearOfJoining(alumniDetails.getYearOfJoining());
        alumni.setPastExperience(alumniDetails.getPastExperience());
        alumni.setLinkedin(alumniDetails.getLinkedin());
        alumni.setFacebook(alumniDetails.getFacebook());
        alumni.setInstagram(alumniDetails.getInstagram());
        alumni.setWebsite(alumniDetails.getWebsite());
        alumni.setPassword(alumniDetails.getPassword());
        return alumniRepository.save(alumni);
    }

    public void deleteAlumni(Long id) {
        alumniRepository.deleteById(id);
    }

    public List<String> getDepartmentsByYear(String year) {
        return alumniRepository.findByYearOfJoining(year)
                .stream()
                .map(Alumni::getDept)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Alumni> getAlumniByDegree(String degree) {
        return alumniRepository.findByDegree(degree);
    }

    public List<Alumni> getAlumniByDepartment(String dept) {
        return alumniRepository.findByDept(dept);
    }

    public List<Alumni> getUsersByYearAndDepartment(String year, String dept) {
        return alumniRepository.findByYearOfJoiningAndDept(year, dept);
    }

    public Alumni authenticateUser(String email, String password) {
        return alumniRepository.findByEmailAndPassword(email, password);
    }

    public Alumni findByEmail(String email) {
        return alumniRepository.findByEmail(email);
    }

    public List<Alumni> getAlumniByYearOfPassing(String year) {
        return alumniRepository.findByYearOfPassing(year);
    }
}