package com.example.back.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.model.Admin;
import com.example.back.model.Alumni;
import com.example.back.services.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  

  @GetMapping
  public List<Admin> getAllAdmins() {
    return adminService.getAllAdmins();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    return adminService.getAdminById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public Admin addAdmin(@RequestBody Admin admin) {
    return adminService.addAdmin(admin);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) throws Exception {
    return ResponseEntity.ok(adminService.updateAdmin(id, adminDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    adminService.deleteAdmin(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody Alumni loginRequest) {
        Admin admin = adminService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (admin != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
