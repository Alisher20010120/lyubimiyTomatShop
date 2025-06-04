package com.example.lyubimiytomatshop.config.security;

import com.example.lyubimiytomatshop.entity.Users;
import com.example.lyubimiytomatshop.repo.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUsersDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    public CustomUsersDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException(username));
        return new CustomUserDetail(users);
    }
}
