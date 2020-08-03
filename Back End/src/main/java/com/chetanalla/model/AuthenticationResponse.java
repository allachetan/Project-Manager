package com.chetanalla.model;

public class AuthenticationResponse {

	private final String jwt;
	private final long blockId;
	
	public AuthenticationResponse(String jwt, long id) {
		this.jwt = jwt;
		blockId = id;
	}
	
	public String getJwt() {
		return jwt;
	}
	
	public long getBlockId() {
		return blockId;
	}
	
}
