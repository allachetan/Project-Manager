package com.chetanalla.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chetanalla.model.BlockRelationship;


public interface BlockRelationshipRepository extends JpaRepository<BlockRelationship, Long>{
	
	List<BlockRelationship> findByParentId(long id);
	
	List<BlockRelationship> findByChildId(long id);
	
}
