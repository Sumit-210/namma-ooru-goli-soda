package com.GoliSoda.Config;

import com.GoliSoda.Entity.Admin;
import com.GoliSoda.Repository.AdminRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final AdminRepository adminRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner runner() {

        return args -> {

            if(adminRepository
                    .findByUsername("admin")
                    .isEmpty()) {

                Admin admin = new Admin();

                admin.setUsername("admin");

                admin.setPassword(
                        passwordEncoder()
                                .encode("admin123")
                );

                admin.setRole("ADMIN");

                adminRepository.save(admin);

                System.out.println(
                        "Admin created successfully");
            }
        };
    }
}