package com.university.erp.security;

import com.university.erp.auth.entity.User;
import com.university.erp.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username)));

        Set<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .flatMap(role -> {
                    Set<SimpleGrantedAuthority> roleAuthorities = role.getPermissions().stream()
                            .map(perm -> new SimpleGrantedAuthority(perm.getCode()))
                            .collect(Collectors.toSet());
                    roleAuthorities.add(new SimpleGrantedAuthority(role.getName()));
                    return roleAuthorities.stream();
                })
                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                "ACTIVE".equalsIgnoreCase(user.getStatus()),
                true,
                true,
                true,
                authorities
        );
    }
}
