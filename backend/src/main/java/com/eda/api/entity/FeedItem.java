package com.eda.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "feed_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String source;
    private String imageUrl;

    @Column(nullable = false)
    private Long userId;
}
