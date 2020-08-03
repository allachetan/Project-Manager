package com.chetanalla.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chetanalla.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByUsername(String username);
	
}
