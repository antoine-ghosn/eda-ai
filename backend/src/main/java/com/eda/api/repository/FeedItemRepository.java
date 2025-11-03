package com.eda.api.repository;

import com.eda.api.entity.FeedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedItemRepository extends JpaRepository<FeedItem, Long> {
    List<FeedItem> findByUserId(Long userId);
}
