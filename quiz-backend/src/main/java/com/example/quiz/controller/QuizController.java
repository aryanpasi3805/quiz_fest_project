package com.example.quiz.controller;

import com.example.quiz.dto.QuestionDTO;
import com.example.quiz.model.Question;
import com.example.quiz.model.User;
import com.example.quiz.service.AuthService;
import com.example.quiz.service.QuizService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    private final AuthService authService;
    private final QuizService quizService;
    private final ObjectMapper mapper = new ObjectMapper();

    public QuizController(AuthService authService, QuizService quizService) {
        this.authService = authService;
        this.quizService = quizService;
    }

    private Optional<User> auth(String header) {
        if (header == null) return Optional.empty();
        String token = header.replaceFirst("(?i)Bearer\s+", "").trim();
        return authService.findByToken(token);
    }

    @GetMapping("/topics")
    public ResponseEntity<?> listTopics(@RequestHeader(name="Authorization", required=false) String authorization) {
        Optional<User> u = auth(authorization);
        if (u.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(quizService.listTopics());
    }

    @GetMapping("/random")
    public ResponseEntity<?> randomQuestions(
            @RequestHeader(name="Authorization", required=false) String authorization,
            @RequestParam String topic,
            @RequestParam(required=false) String difficulty,
            @RequestParam(defaultValue = "10") int count
    ) {
        Optional<User> u = auth(authorization);
        if (u.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");

        List<Question> questions = quizService.getRandomQuestions(topic, difficulty, count);
        List<QuestionDTO> dto = questions.stream().map(q -> {
            try {
                List<String> options = mapper.readValue(q.getOptionsJson(), List.class);
                return new QuestionDTO(q.getId(), q.getTopic(), q.getDifficulty(), q.getText(), options);
            } catch (Exception ex) {
                return new QuestionDTO(q.getId(), q.getTopic(), q.getDifficulty(), q.getText(), List.of());
            }
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dto);
    }
}
