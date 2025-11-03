package com.eda.api.controller;

import com.eda.api.entity.FeedItem;
import com.eda.api.repository.FeedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
@CrossOrigin(origins = "*")
public class FeedController {

    @Autowired
    private FeedItemRepository feedItemRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedItem>> getFeedByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(feedItemRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<FeedItem> createFeedItem(@RequestBody FeedItem feedItem) {
        return ResponseEntity.ok(feedItemRepository.save(feedItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedItem(@PathVariable Long id) {
        feedItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
