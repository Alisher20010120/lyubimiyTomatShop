package com.example.lyubimiytomatshop.service;

import com.example.lyubimiytomatshop.entity.Role;
import com.example.lyubimiytomatshop.entity.RoleName;
import com.example.lyubimiytomatshop.entity.Users;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKeyForToken;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secretKeyForToken.getBytes());
    }

    public String generateToken(Users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());

        StringJoiner sj = new StringJoiner(", ");
        for (Role role : user.getRoles()) {
            sj.add(role.getRoleName().toString());
        }
        claims.put("roles", sj.toString());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .claim("userId",user.getId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 10 * 60))
                .signWith(secretKey)
                .compact();
    }

    public boolean validate(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getUserName(String token) {
        try {
            Claims claims = getClaims(token);

            System.out.println("Claims: " + claims);
            System.out.println("Subject: " + claims.getSubject());

            return claims.getSubject();
        } catch (JwtException e) {
            System.out.println("Xatolik: " + e.getMessage());
            return null;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public List<Role> getRoles(String token) {
        Claims claims = getClaims(token);
        String roles = (String) claims.get("roles");

        return Arrays.stream(roles.split(","))
                .map(item -> {
                    if (Arrays.stream(RoleName.values()).anyMatch(role -> role.name().equals(item.trim()))) {
                        return new Role(null, RoleName.valueOf(item.trim()));
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public String extractUsername(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getSubject();
        } catch (JwtException e) {
            System.out.println("Error extracting username: " + e.getMessage());
            return null;
        }
    }
}
