// package com.example.back.controller;

// import java.util.List;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.example.back.model.Stories;
// import com.example.back.services.StoriesService;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api/feeds")
// public class StoriesController {
//     @Autowired
//     private final StoriesService storiesService;

//     public StoriesController(StoriesService storiesService) {
//         this.storiesService = storiesService;
//     }

//     @GetMapping
//     public List<Stories> getAllStories() {
//         return storiesService.getAllStories();
//     }

//     @GetMapping("/category/{catagory}")
//     public List<Stories> getStoriesByCatagory(@PathVariable String catagory) {
//         return storiesService.getStoriesByCatagory(catagory);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Stories> getStoryById(@PathVariable Long id) {
//         return storiesService.getStoryById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public Stories addStory(@RequestBody Stories stories) {
//         return storiesService.addstory(stories);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Stories> updateStory(@PathVariable Long id, @RequestBody Stories storyDetails) throws Exception {
//         return ResponseEntity.ok(storiesService.updateStory(id, storyDetails));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
//         storiesService.deleteStory(id);
//         return ResponseEntity.noContent().build();
//     }
// }

package com.example.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.back.model.Stories;
import com.example.back.services.StoriesService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/feeds")
public class StoriesController {

    @Autowired
    private final StoriesService storiesService;

    public StoriesController(StoriesService storiesService) {
        this.storiesService = storiesService;
    }

    @GetMapping
    public List<Stories> getAllStories() {
        return storiesService.getAllStories();
    }

    @GetMapping("/category/{catagory}")
    public List<Stories> getStoriesByCatagory(@PathVariable String catagory) {
        return storiesService.getStoriesByCatagory(catagory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stories> getStoryById(@PathVariable Long id) {
        return storiesService.getStoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Stories addStory(@RequestBody Stories stories) {
        return storiesService.addStory(stories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stories> updateStory(@PathVariable Long id, @RequestBody Stories storyDetails) throws Exception {
        return ResponseEntity.ok(storiesService.updateStory(id, storyDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        storiesService.deleteStory(id);
        return ResponseEntity.noContent().build();
    }
}
