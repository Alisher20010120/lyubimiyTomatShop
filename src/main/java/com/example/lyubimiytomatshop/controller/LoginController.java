package com.example.lyubimiytomatshop.controller;

import com.example.lyubimiytomatshop.config.security.CustomUserDetail;
import com.example.lyubimiytomatshop.dto.LoginDTO;
import com.example.lyubimiytomatshop.entity.Users;
import com.example.lyubimiytomatshop.service.JwtService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api")
public class LoginController {
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    public LoginController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginDTO loginDTO){
        var authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        CustomUserDetail customUserDetails = (CustomUserDetail) authenticate.getPrincipal();
        Users user = customUserDetails.getUser();

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(Map.of(
                "token", token
        ));
    }

}
