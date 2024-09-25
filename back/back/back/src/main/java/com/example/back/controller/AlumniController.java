// package com.example.back.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import com.example.back.model.Alumni;
// import com.example.back.services.AlumniService;

// import java.util.List;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api/alumni")
// public class AlumniController {

//     @Autowired
//     private final AlumniService alumniService;

//     public AlumniController(AlumniService alumniService) {
//         this.alumniService = alumniService;
//     }

//     @GetMapping
//     public ResponseEntity<List<Alumni>> getAllAlumni(@RequestParam(value = "degree", required = false) String degree,
//                                                       @RequestParam(value = "year", required = false) String year,
//                                                       @RequestParam(value = "dept", required = false) String dept,
//                                                       @RequestParam(value = "designation", required = false) String designation) {
//         List<Alumni> alumni;
//         if (degree != null) {
//             alumni = alumniService.getAlumniByDegree(degree);
//         } else if (year != null && dept != null) {
//             alumni = alumniService.getUsersByYearAndDepartment(year, dept);
//         } else if (year != null) {
//             alumni = alumniService.getAlumniByYearOfPassing(year);
//         } else if (dept != null) {
//             alumni = alumniService.getAlumniByDepartment(dept);
//         } else {
//             alumni = alumniService.getAllAlumni();
//         }
//         return ResponseEntity.ok(alumni);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Alumni> getAlumniById(@PathVariable Long id) {
//         return alumniService.getAlumniById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public ResponseEntity<Alumni> addAlumni(@RequestBody Alumni alumni) {
//         Alumni createdAlumni = alumniService.addAlumni(alumni);
//         return ResponseEntity.ok(createdAlumni);
//     }

//     @PutMapping("/email/{email}")
//     public ResponseEntity<Alumni> updateAlumni(@PathVariable Long id, @RequestBody Alumni alumniDetails) throws Exception {
//         Alumni updatedAlumni = alumniService.updateAlumni(id, alumniDetails);
//         return updatedAlumni != null ? ResponseEntity.ok(updatedAlumni) : ResponseEntity.notFound().build();
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteAlumni(@PathVariable Long id) {
//         alumniService.deleteAlumni(id);
//         return ResponseEntity.noContent().build();
//     }

//     @GetMapping("/departments")
//     public ResponseEntity<List<String>> getDepartmentsByYear(@RequestParam("year") String year) {
//         List<String> departments = alumniService.getDepartmentsByYear(year);
//         return ResponseEntity.ok(departments);
//     }

//     @PostMapping("/login")
//     public ResponseEntity<String> authenticateUser(@RequestBody Alumni loginRequest) {
//         Alumni alumni = alumniService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
//         if (alumni != null) {
//             return ResponseEntity.ok("Login successful");
//         } else {
//             return ResponseEntity.status(401).body("Invalid credentials");
//         }
//     }

//     @GetMapping("/findByEmail")
//     public ResponseEntity<Alumni> getAlumniByEmail(@RequestParam String email) {
//         Alumni alumni = alumniService.findByEmail(email);
//         return alumni != null ? ResponseEntity.ok(alumni) : ResponseEntity.notFound().build();
//     }
// }


package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.back.model.Alumni;
import com.example.back.services.AlumniService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/alumni")
public class AlumniController {

    @Autowired
    private final AlumniService alumniService;

    public AlumniController(AlumniService alumniService) {
        this.alumniService = alumniService;
    }

    @GetMapping
    public ResponseEntity<List<Alumni>> getAllAlumni(@RequestParam(value = "degree", required = false) String degree,
                                                      @RequestParam(value = "year", required = false) String year,
                                                      @RequestParam(value = "dept", required = false) String dept,
                                                      @RequestParam(value = "designation", required = false) String designation) {
        List<Alumni> alumni;
        if (degree != null) {
            alumni = alumniService.getAlumniByDegree(degree);
        } else if (year != null && dept != null) {
            alumni = alumniService.getUsersByYearAndDepartment(year, dept);
        } else if (year != null) {
            alumni = alumniService.getAlumniByYearOfPassing(year);
        } else if (dept != null) {
            alumni = alumniService.getAlumniByDepartment(dept);
        } else {
            alumni = alumniService.getAllAlumni();
        }
        return ResponseEntity.ok(alumni);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumni> getAlumniById(@PathVariable Long id) {
        return alumniService.getAlumniById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Alumni> addAlumni(@RequestBody Alumni alumni) {
        Alumni createdAlumni = alumniService.addAlumni(alumni);
        return ResponseEntity.ok(createdAlumni);
    }

    @PutMapping("/email/{email}")
    public ResponseEntity<Alumni> updateAlumni(@PathVariable String email, @RequestBody Alumni alumniDetails) throws Exception {
        Alumni updatedAlumni = alumniService.updateAlumni(email, alumniDetails);
        return updatedAlumni != null ? ResponseEntity.ok(updatedAlumni) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumni(@PathVariable Long id) {
        alumniService.deleteAlumni(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/departments")
    public ResponseEntity<List<String>> getDepartmentsByYear(@RequestParam("year") String year) {
        List<String> departments = alumniService.getDepartmentsByYear(year);
        return ResponseEntity.ok(departments);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody Alumni loginRequest) {
        Alumni alumni = alumniService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (alumni != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<Alumni> getAlumniByEmail(@RequestParam String email) {
        Alumni alumni = alumniService.findByEmail(email);
        return alumni != null ? ResponseEntity.ok(alumni) : ResponseEntity.notFound().build();
    }
}
