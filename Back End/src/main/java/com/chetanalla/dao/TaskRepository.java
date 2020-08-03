package com.chetanalla.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chetanalla.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

	List<Task> findByBlockId(long id);
	
}
