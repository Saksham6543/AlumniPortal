package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.example.back.model.Admin;
import com.example.back.repository.AdminRepository;


@Service
public class AdminService {
    @Autowired
    private final AdminRepository adminRepository;

      public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

     public Admin authenticateUser(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

     public Admin updateAdmin(Long id, Admin adminDetails)  throws  Exception{
        return adminRepository.findById(id)
                .map(admin -> {
                    admin.setEmail(adminDetails.getEmail());
                    admin.setPassword(adminDetails.getPassword());
                    return adminRepository.save(admin);
                }).orElseThrow(() -> new Exception("Admin not found with id " + id));
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

}
