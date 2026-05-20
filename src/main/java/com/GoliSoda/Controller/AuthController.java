package com.GoliSoda.Controller;
import com.GoliSoda.Repository.*;
import com.GoliSoda.Utility.*;
import lombok.RequiredArgsConstructor;
import com.GoliSoda.Entity.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.GoliSoda.DTO.*;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest request) {

        Admin admin = adminRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid username"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword())) {

            throw new RuntimeException(
                    "Invalid password");
        }

        String token =
                jwtUtil.generateToken(
                        admin.getUsername());

        return ResponseEntity.ok(
                new AuthResponse(token));
    }
}
