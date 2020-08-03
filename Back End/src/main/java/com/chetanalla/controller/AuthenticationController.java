package com.chetanalla.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chetanalla.dao.UserRepository;
import com.chetanalla.model.AuthenticationRequest;
import com.chetanalla.model.AuthenticationResponse;
import com.chetanalla.model.User;
import com.chetanalla.service.BlockService;
import com.chetanalla.service.MyUserDetailsService;
import com.chetanalla.util.JwtUtil;

@RestController
public class AuthenticationController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	private MyUserDetailsService userDetailsService;
	
	
	@Autowired
	private BlockService blockService;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));

		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		long blockId = userDetailsService.loadUserForBlockId(authenticationRequest.getUsername()).getBlockId();
		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt, blockId));
	}

	@RequestMapping("/demo")
	public ResponseEntity<?> createDemoToken() {
		final String jwt = jwtTokenUtil.generateToken("demo");
		long blockId = blockService.cloneBlock(1);
		return ResponseEntity.ok(new AuthenticationResponse(jwt, blockId));
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createUser(@RequestBody User user) {
		userRepo.save(new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getBlockId()));
	}

}
