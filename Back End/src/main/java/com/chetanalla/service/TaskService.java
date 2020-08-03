package com.chetanalla.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chetanalla.dao.TaskRepository;
import com.chetanalla.model.Task;

@Service
@Transactional
public class TaskService {

	@Autowired
	private TaskRepository taskRepo;
	
	public void saveTask(Task task) {
		taskRepo.save(task);
	}

	public Task getTask(long id) {
		return taskRepo.findById(id).get();
	}
	
	public void deleteTask(long id) {
		taskRepo.deleteById(id);
	}

	public List<Task> getAllTasks(long id){
		return taskRepo.findByBlockId(id);
	}
	
}
