package com.example.backend.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Define your secret key
    private static final String SECRET_KEY = "yourSecretKey";
    
    // Generate a secure key for HS512 algorithm
    private static final byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists!");
        }

        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (userService.authenticateUser(email, password)) {
            // Generate JWT token
            String token = Jwts.builder()
                    .setSubject(email)
                    .setExpiration(new Date(System.currentTimeMillis() + 900000)) // Token expires in 15 min
                    .signWith(SignatureAlgorithm.HS512, keyBytes) // Use the generated key
                    .compact();

            // Return token as part of the response
            return ResponseEntity.ok().body(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password!");
        }
    }
    
    @GetMapping("/email")
    public ResponseEntity<?> getUserEmail(@RequestHeader("Authorization") String token) {
        // Extract the email from the JWT token
        String email = Jwts.parserBuilder()
                .setSigningKey(keyBytes)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        // Create a map to hold both data and headers
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("email", email);

        // You can include any other headers needed here
        HttpHeaders headers = new HttpHeaders();
        headers.add("Custom-Header", "Value");

        // Return both data and headers in the ResponseEntity
        return ResponseEntity.ok().headers(headers).body(responseData);
    }

}
