package com.chetanalla.pm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "module")
public class Module {

	@Id
	@Column(name = "module_id")
	private int moduleId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	
	public Module() {
		title = "Title";
		description = "description...";
	}
	
	public Module(String t, String d) {
		title = t;
		description = d;
	}
	
	public int getModuleId() {
		return moduleId;
	}
	
	public void setModuleId(int id) {
		this.moduleId = id;
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
	
	@Override
	public String toString() {
		return "ID: " + moduleId + " Title: " + title + " Description: " + description;
	}
}

