package com.fromgrove.from_grove_backend.repository;


import com.fromgrove.from_grove_backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Custom method to check if email exists
    boolean existsByEmail(String email);
    
    // Custom method to find user by email (for login)
    User findByEmail(String email);
}
