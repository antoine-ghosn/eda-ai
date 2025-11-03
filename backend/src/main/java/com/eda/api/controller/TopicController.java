package com.eda.api.controller;

import com.eda.api.entity.Topic;
import com.eda.api.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*")
public class TopicController {

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Topic>> getTopicsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(topicRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        return ResponseEntity.ok(topicRepository.save(topic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        topicRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
