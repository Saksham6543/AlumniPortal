// package com.example.back.controller;

// import com.example.back.model.Student;
// import com.example.back.services.StudentService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/students")
// public class StudentController {

//     @Autowired
//     private StudentService studentService;

//     @GetMapping
//     public List<Student> getAllStudents() {
//         return studentService.getAllStudents();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
//         return studentService.getStudentById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public Student createStudent(@RequestBody Student student) {
//         return studentService.saveStudent(student);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
//         return ResponseEntity.ok(studentService.updateStudent(id, studentDetails));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
//         studentService.deleteStudent(id);
//         return ResponseEntity.noContent().build();
//     }

    
// }


package com.example.back.controller;

import com.example.back.model.Student;
import com.example.back.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return ResponseEntity.ok(studentService.updateStudent(id, studentDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateStudent(@RequestBody Student student) {
        Optional<Student> existingStudent = studentService.authenticateStudent(student.getEmail(), student.getPassword());
        if (existingStudent.isPresent()) {
            return ResponseEntity.ok(existingStudent.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
