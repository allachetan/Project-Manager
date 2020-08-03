package com.chetanalla.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "block_tbl")
public class Block {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long blockId;

	@Column(name = "block_title")
	private String title;

	@Lob
	@Column(name = "block_description")
	private String description;

	@Column(name = "block_x")
	private double blockX;

	@Column(name = "block_y")
	private double blockY;

	public Block() {
		title = "Title";
		description = "description...";
		blockX = 0.0;
		blockY = 0.0;
	}

	public Block(String t, String d, double x, double y) {
		title = t;
		description = d;
		blockX = x;
		blockY = y;
	}

	public long getBlockId() {
		return blockId;
	}

	public void setBlockId(long id) {
		this.blockId = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String t) {
		this.title = t;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String d) {
		description = d;
	}

	public double getBlockX() {
		return blockX;
	}

	public void setBlockX(double x) {
		blockX = x;
	}

	public double getBlockY() {
		return blockY;
	}

	public void setBlockY(double y) {
		blockY = y;
	}

	@Override
	public String toString() {
		return "ID: " + blockId + " Title: " + title + " Description: " + description + " X: " + blockX + " Y: "
				+ blockY;
	}
}
