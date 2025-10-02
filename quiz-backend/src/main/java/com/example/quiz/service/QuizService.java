package com.example.quiz.service;

import com.example.quiz.model.Question;
import com.example.quiz.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    private final QuestionRepository questionRepository;
    public QuizService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<String> listTopics() {
        List<Question> all = questionRepository.findAll();
        return all.stream().map(q -> q.getTopic().toLowerCase()).distinct().sorted().collect(Collectors.toList());
    }

    public List<Question> getRandomQuestions(String topic, String difficulty, int count) {
        List<Question> pool;
        if (difficulty == null || difficulty.isBlank()) {
            pool = questionRepository.findByTopicIgnoreCase(topic);
        } else {
            pool = questionRepository.findByTopicIgnoreCaseAndDifficultyIgnoreCase(topic, difficulty);
        }
        Collections.shuffle(pool);
        if (pool.size() <= count) return pool;
        return pool.subList(0, count);
    }
}
