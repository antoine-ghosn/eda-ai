package com.eda.api.controller;

import com.eda.api.entity.Task;
import com.eda.api.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(taskRepository.findByUserId(userId));
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<Task>> getActiveTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskRepository.findByUserIdAndCompleted(userId, false));
    }

    @GetMapping("/user/{userId}/completed")
    public ResponseEntity<List<Task>> getCompletedTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskRepository.findByUserIdAndCompleted(userId, true));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setCompleted(taskDetails.getCompleted());
                    task.setDueDate(taskDetails.getDueDate());
                    task.setPriority(taskDetails.getPriority());
                    task.setCategory(taskDetails.getCategory());
                    return ResponseEntity.ok(taskRepository.save(task));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
