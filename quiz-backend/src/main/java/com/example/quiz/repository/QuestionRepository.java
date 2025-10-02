package com.example.quiz.repository;

import com.example.quiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTopicIgnoreCaseAndDifficultyIgnoreCase(String topic, String difficulty);
    List<Question> findByTopicIgnoreCase(String topic);
}
