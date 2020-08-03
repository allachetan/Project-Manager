package com.chetanalla.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chetanalla.dao.UserRepository;
import com.chetanalla.model.MyUserPrincipal;
import com.chetanalla.model.User;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
    private UserRepository userRepository;
	 
    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new MyUserPrincipal(user);
    }
    
    public User loadUserForBlockId(String username) {
    	return userRepository.findByUsername(username);
    }
	
}
