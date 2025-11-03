package com.eda.api.config;

import com.eda.api.entity.*;
import com.eda.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FeedItemRepository feedItemRepository;

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User();
        user1.setUsername("demo");
        user1.setPassword("demo123");
        user1.setFullName("Alex Doe");
        user1.setEmail("alex.doe@example.com");
        user1.setAccountType("personal");
        user1.setAvatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop");
        user1.setInstagram("alexdoe");
        user1.setTiktok("alex_doe");
        user1.setWhatsapp("+1234567890");
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("professional");
        user2.setPassword("pro123");
        user2.setFullName("Sarah Smith");
        user2.setEmail("sarah.smith@company.com");
        user2.setAccountType("professional");
        userRepository.save(user2);

        User user3 = new User();
        user3.setUsername("enterprise");
        user3.setPassword("ent123");
        user3.setFullName("John Enterprise");
        user3.setEmail("john@enterprise.com");
        user3.setAccountType("enterprise");
        userRepository.save(user3);

        Topic topic1 = new Topic();
        topic1.setName("Health");
        topic1.setColorFrom("#FFC0CB");
        topic1.setColorTo("#FFE4E1");
        topic1.setItemCount(12);
        topic1.setIsFavorite(false);
        topic1.setUserId(1L);
        topicRepository.save(topic1);

        Topic topic2 = new Topic();
        topic2.setName("Travel");
        topic2.setColorFrom("#FFD580");
        topic2.setColorTo("#FFEBCD");
        topic2.setItemCount(23);
        topic2.setIsFavorite(false);
        topic2.setUserId(1L);
        topicRepository.save(topic2);

        Topic topic3 = new Topic();
        topic3.setName("Food");
        topic3.setColorFrom("#90EE90");
        topic3.setColorTo("#ECFDF5");
        topic3.setItemCount(35);
        topic3.setIsFavorite(false);
        topic3.setUserId(1L);
        topicRepository.save(topic3);

        Topic topic4 = new Topic();
        topic4.setName("Design");
        topic4.setColorFrom("#87CEEB");
        topic4.setColorTo("#DBEAFE");
        topic4.setItemCount(8);
        topic4.setIsFavorite(false);
        topic4.setUserId(1L);
        topicRepository.save(topic4);

        Topic topic5 = new Topic();
        topic5.setName("AI");
        topic5.setColorFrom("#9370DB");
        topic5.setColorTo("#F3E8FF");
        topic5.setItemCount(15);
        topic5.setIsFavorite(false);
        topic5.setUserId(1L);
        topicRepository.save(topic5);

        Task task1 = new Task();
        task1.setTitle("Draft Q3 report introduction");
        task1.setDescription("Write introduction for Q3 report");
        task1.setStatus("todo");
        task1.setPriority("high");
        task1.setDueDate(LocalDate.now().plusDays(1));
        task1.setCategory("Q3 Report");
        task1.setThumbnailUrl("https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400");
        task1.setUserId(1L);
        task1.setCompleted(false);
        taskRepository.save(task1);

        Task task2 = new Task();
        task2.setTitle("Follow up with Alex on the slides");
        task2.setDescription("Check presentation slides with Alex");
        task2.setStatus("todo");
        task2.setPriority("medium");
        task2.setDueDate(LocalDate.now().plusDays(3));
        task2.setCategory("Alex");
        task2.setThumbnailUrl("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400");
        task2.setUserId(1L);
        task2.setCompleted(false);
        taskRepository.save(task2);

        Task task3 = new Task();
        task3.setTitle("Schedule team sync for project kickoff");
        task3.setDescription("Organize kickoff meeting for Project Phoenix");
        task3.setStatus("todo");
        task3.setPriority("high");
        task3.setDueDate(LocalDate.now());
        task3.setCategory("Project Phoenix");
        task3.setUserId(1L);
        task3.setCompleted(false);
        taskRepository.save(task3);

        Task task4 = new Task();
        task4.setTitle("Finalize presentation deck");
        task4.setDescription("Complete the presentation");
        task4.setStatus("done");
        task4.setPriority("low");
        task4.setDueDate(LocalDate.now().minusDays(1));
        task4.setUserId(1L);
        task4.setCompleted(true);
        taskRepository.save(task4);

        FeedItem feed1 = new FeedItem();
        feed1.setTitle("10-Minute Quinoa Salad Recipe");
        feed1.setSource("From a TikTok by @healthy_eats");
        feed1.setImageUrl("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800");
        feed1.setUserId(1L);
        feedItemRepository.save(feed1);

        FeedItem feed2 = new FeedItem();
        feed2.setTitle("Top 5 Things to Do in Santorini");
        feed2.setSource("From an Instagram reel");
        feed2.setImageUrl("https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800");
        feed2.setUserId(1L);
        feedItemRepository.save(feed2);

        FeedItem feed3 = new FeedItem();
        feed3.setTitle("Best Italian Restaurant in Downtown");
        feed3.setSource("From a YouTube Short");
        feed3.setImageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800");
        feed3.setUserId(1L);
        feedItemRepository.save(feed3);

        System.out.println("Mock data initialized successfully!");
        System.out.println("Demo users:");
        System.out.println("  - username: demo, password: demo123 (Personal)");
        System.out.println("  - username: professional, password: pro123 (Professional)");
        System.out.println("  - username: enterprise, password: ent123 (Enterprise)");
    }
}
