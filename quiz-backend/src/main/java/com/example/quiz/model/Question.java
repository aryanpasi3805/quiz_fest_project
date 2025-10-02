package com.example.quiz.model;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String topic;

    @Column(nullable=false)
    private String difficulty; // e.g. easy, medium, hard

    @Column(columnDefinition = "TEXT", nullable=false)
    private String text;

    /**
     * options stored as JSON array string: e.g. ["A","B","C","D"]
     * correctIndex is 0-based index into options.
     */
    @Column(columnDefinition = "TEXT", nullable=false)
    private String optionsJson;

    @Column(nullable=false)
    private Integer correctIndex;

    public Question() {}

    public Question(String topic, String difficulty, String text, String optionsJson, Integer correctIndex) {
        this.topic = topic;
        this.difficulty = difficulty;
        this.text = text;
        this.optionsJson = optionsJson;
        this.correctIndex = correctIndex;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }

    public Integer getCorrectIndex() { return correctIndex; }
    public void setCorrectIndex(Integer correctIndex) { this.correctIndex = correctIndex; }
}
