package com.chetanalla.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "user_tbl")
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "block_id")
	private long blockId;
	
	public User() {
	}
	
	public User(String username, String password, long blockId) {
		this.username = username;
		this.password = password;
		this.blockId = blockId;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getBlockId() {
		return blockId;
	}
	public void setBlockId(long id) {
		blockId = id;
	}
	
	
	
}
