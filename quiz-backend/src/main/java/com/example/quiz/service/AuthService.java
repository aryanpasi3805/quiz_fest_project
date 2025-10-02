package com.example.quiz.service;

import com.example.quiz.model.User;
import com.example.quiz.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> login(String username, String password) {
        Optional<User> u = userRepository.findByUsername(username);
        if (u.isPresent() && u.get().getPassword().equals(password)) {
            // generate token
            String token = UUID.randomUUID().toString();
            User user = u.get();
            user.setToken(token);
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public Optional<User> findByToken(String token) {
        return userRepository.findByToken(token);
    }
}
