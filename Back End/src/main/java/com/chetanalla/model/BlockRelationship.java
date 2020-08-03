package com.chetanalla.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "relationships_tbl")
public class BlockRelationship {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long relationshipId;
	
	@Column(name = "parent_id")
	private long parentId;
	
	@Column(name = "child_id")
	private long childId;
	
	public BlockRelationship() {
	}
	
	public BlockRelationship(long p, long c) {
		parentId = p;
		childId = c;
	}

	public long getRelationshipId() {
		return relationshipId;
	}
	
	public void setRelationshipId(long id) {
		relationshipId = id;
	}
	
	public long getParentId() {
		return parentId;
	}
	
	public void setParentId(long id) {
		parentId = id;
	}
	
	public long getChildId() {
		return childId;
	}
	
	public void setChildId(long id) {
		childId = id;
	}
	
	public String toString() {
		return relationshipId + " " + parentId + " " + childId;
	}
	
}
