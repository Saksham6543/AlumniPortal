// package com.example.back.services;

// import java.util.List;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.example.back.model.Stories;
// import com.example.back.repository.StoriesRepository;
// import java.util.Optional;

// @Service
// public class StoriesService {
    
//     @Autowired
//     private final StoriesRepository storiesRepository;

//     public StoriesService(StoriesRepository storiesRepository) {
//         this.storiesRepository = storiesRepository;
//     }

//     public List<Stories> getAllStories() {
//         return storiesRepository.findAll();
//     }

//     public List<Stories> getStoriesByCatagory(String catagory) {
//         return storiesRepository.findByCatagory(catagory);
//     }

//     public Optional<Stories> getStoryById(Long id) {
//         return storiesRepository.findById(id);
//     }

//     public Stories addstory(Stories story) {
//         return storiesRepository.save(story);
//     }

//     public Stories updateStory(Long id, Stories storyDetails) throws Exception {
//         Stories story = storiesRepository.findById(id)
//                 .orElseThrow(() -> new Exception("Story not found"));

//         story.setDate(storyDetails.getDate());
//         story.setTitle(storyDetails.getTitle());
//         story.setDescription(storyDetails.getDescription());
//         story.setCatagory(storyDetails.getCatagory());

//         return storiesRepository.save(story);
//     }

//     public void deleteStory(Long id) {
//         storiesRepository.deleteById(id);
//     }
// }

package com.example.back.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back.model.Stories;
import com.example.back.repository.StoriesRepository;

@Service
public class StoriesService {

    @Autowired
    private final StoriesRepository storiesRepository;

    public StoriesService(StoriesRepository storiesRepository) {
        this.storiesRepository = storiesRepository;
    }

    public List<Stories> getAllStories() {
        return storiesRepository.findAll();
    }

    public List<Stories> getStoriesByCatagory(String catagory) {
        return storiesRepository.findByCatagory(catagory);
    }

    public Optional<Stories> getStoryById(Long id) {
        return storiesRepository.findById(id);
    }

    public Stories addStory(Stories story) {
        return storiesRepository.save(story);
    }

    public Stories updateStory(Long id, Stories storyDetails) throws Exception {
        Stories story = storiesRepository.findById(id)
                .orElseThrow(() -> new Exception("Story not found"));

        story.setDate(storyDetails.getDate());
        story.setTitle(storyDetails.getTitle());
        story.setDescription(storyDetails.getDescription());
        story.setCatagory(storyDetails.getCatagory());

        return storiesRepository.save(story);
    }

    public void deleteStory(Long id) {
        storiesRepository.deleteById(id);
    }
}
