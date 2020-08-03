package com.chetanalla.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.chetanalla.model.Task;
import com.chetanalla.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {

	@Autowired
	private TaskService service;
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> modBlockTable(@RequestBody Task task) {
		service.saveTask(task);
		return ResponseEntity.ok(task);
	}
	
	@RequestMapping("/get/{id}")
	@ResponseBody
	public ResponseEntity<?> getTask(@PathVariable String id) {
		long taskId = Long.parseLong(id);
		Task task = service.getTask(taskId);
		return ResponseEntity.ok(task);
	}
	
	@RequestMapping("/getall/{id}")
	@ResponseBody
	public ResponseEntity<?> getAllTasks(@PathVariable String id) {
		List<Task> tasks = service.getAllTasks(Long.parseLong(id));
		return ResponseEntity.ok(tasks);
	}
	
	@RequestMapping("/delete/{id}")
	@ResponseBody
	public String deleteTask(@PathVariable String id) {
		long taskId = Long.parseLong(id);
		service.deleteTask(taskId);
		return "deleted task with id: " + taskId;
	}
	
}
