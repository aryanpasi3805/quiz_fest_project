package com.example.quiz.dto;

import java.util.List;

public class QuestionDTO {
    private Long id;
    private String topic;
    private String difficulty;
    private String text;
    private List<String> options;
    // do not send correct answer to frontend in real exam flows
    public QuestionDTO() {}
    public QuestionDTO(Long id, String topic, String difficulty, String text, List<String> options) {
        this.id = id; this.topic = topic; this.difficulty = difficulty; this.text = text; this.options = options;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
}
