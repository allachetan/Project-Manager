package com.chetanalla.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "task_tbl")
public class Task {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long taskId;
	
	@Column(name = "blockId")
	private long blockId;
	
	@Column(name = "taskListId")
	private int taskListId;
	
	@Column(name = "taskIndex")
	private int taskIndex;
	
	@Column(name = "taskName")
	private String taskName;
	
	@Column(name = "statusId")
	private int statusId;
	
	@Column(name = "displayDate")
	private String displayDate;

	@Column(name = "priorityId")
	private int priorityId;

	public Task() {
		taskName = "New Task";
		statusId = 0;
		displayDate = "Apr 12";
		priorityId = 0;
	}
	
	public Task(long blockId, int taskListId, int taskIndex) {
		this.blockId = blockId;
		this.taskListId = taskListId;
		this.taskIndex = taskIndex;
		taskName = "New Task";
		statusId = 0;
		displayDate = "Apr 12";
		priorityId = 0;
	}
	
	public Task(long blockId, int taskListId, int taskIndex, String taskName, int statusId, String displayDate, int priorityId){
		this.blockId = blockId;
		this.taskListId = taskListId;
		this.taskIndex = taskIndex;
		this.taskName = taskName;
		this.statusId = statusId;
		this.displayDate = displayDate;
		this.priorityId = priorityId;
	}
	
	public long getTaskId() {
		return taskId;
	}

	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	public long getBlockId() {
		return blockId;
	}

	public void setBlockId(long blockId) {
		this.blockId = blockId;
	}

	public int getTaskListId() {
		return taskListId;
	}

	public void setTaskListId(int taskListId) {
		this.taskListId = taskListId;
	}

	public int getTaskIndex() {
		return taskIndex;
	}

	public void setTaskIndex(int taskIndex) {
		this.taskIndex = taskIndex;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}

	public String getDisplayDate() {
		return displayDate;
	}

	public void setDisplayDate(String displayDate) {
		this.displayDate = displayDate;
	}

	public int getPriorityId() {
		return priorityId;
	}

	public void setPriorityId(int priorityId) {
		this.priorityId = priorityId;
	}
	
	
}
