package com.example.lyubimiytomatshop.config;

import com.example.lyubimiytomatshop.entity.Role;
import com.example.lyubimiytomatshop.entity.RoleName;
import com.example.lyubimiytomatshop.entity.Users;
import com.example.lyubimiytomatshop.repo.RoleRepository;
import com.example.lyubimiytomatshop.repo.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

//@Component
public class DataLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(RoleRepository roleRepository, UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        Role role = Role.builder()
                .roleName(RoleName.ROLE_ADMIN)
                .build();
        Role role1 = Role.builder()
                .roleName(RoleName.ROLE_USER)
                .build();
        Role role2 = Role.builder()
                .roleName(RoleName.ROLE_SUPER_ADMIN)
                .build();
        roleRepository.save(role);
        roleRepository.save(role1);
        roleRepository.save(role2);

        Users users= Users.builder()
                .firstName("Alisher")
                .lastName("Nayimov")
                .email("alinayimov04@gmail.com")
                .password(passwordEncoder.encode("1"))
                .roles(new ArrayList<>(List.of(role)))
                .build();
        Users users1= Users.builder()
                .firstName("Ali")
                .lastName("Valiyev")
                .email("nayimovalisher06@gmail.com")
                .password(passwordEncoder.encode("2"))
                .roles(new ArrayList<>(List.of(role1)))
                .chatId(913491692L)
                .build();
        usersRepository.save(users);
        usersRepository.save(users1);
    }
}
