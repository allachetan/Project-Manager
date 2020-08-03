package com.chetanalla.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chetanalla.dao.BlockRelationshipRepository;
import com.chetanalla.dao.BlockRepository;
import com.chetanalla.dao.TaskRepository;
import com.chetanalla.model.Block;
import com.chetanalla.model.BlockRelationship;
import com.chetanalla.model.Task;

@Service
@Transactional
public class BlockService {

	@Autowired
	private BlockRepository blockRepo;

	@Autowired
	private TaskRepository taskRepo;

	@Autowired
	private BlockRelationshipRepository relationshipRepo;

	private HashMap<Long, Long> blockMap;

	public void saveBlock(Block block) {
		blockRepo.save(block);
	}

	private long createBlock(Block block) {
		Block ret = blockRepo.save(block);
		return ret.getBlockId();
	}

	public Block getBlock(long id) {
		return blockRepo.findById(id).get();
	}

	public void deleteBlock(long id) {
		if (id != 1) {
			blockRepo.deleteById(id);
			List<Task> tasks = taskRepo.findByBlockId(id);
			for (Task task : tasks) {
				taskRepo.deleteById(task.getTaskId());
			}
			List<BlockRelationship> parentRelationships = relationshipRepo.findByParentId(id);
			for (BlockRelationship relationship : parentRelationships) {
				deleteRelationship(relationship);
				autoDelete(relationship.getChildId(), 1);
			}
			List<BlockRelationship> childRelationships = relationshipRepo.findByChildId(id);
			for (BlockRelationship relationship : childRelationships) {
				deleteRelationship(relationship);
			}
		}
	}

	private void autoDelete(long id, long dontDelete) {
		if (id != dontDelete) {
			List<BlockRelationship> childRelationships = relationshipRepo.findByChildId(id);
			if (childRelationships.size() == 0) {
				List<Task> tasks = taskRepo.findByBlockId(id);
				for (Task task : tasks) {
					taskRepo.deleteById(task.getTaskId());
				}
				blockRepo.deleteById(id);
				List<BlockRelationship> parentRelationships = relationshipRepo.findByParentId(id);
				for (BlockRelationship relationship : parentRelationships) {
					deleteRelationship(relationship);
					autoDelete(relationship.getChildId(), 1);
				}
				for (BlockRelationship relationship : childRelationships) {
					deleteRelationship(relationship);
				}
			}
		}
	}

	public List<Block> getAllBlocks() {
		return blockRepo.findAll();
	}

	public List<BlockRelationship> getRelationships(long id) {
		return relationshipRepo.findByParentId(id);
	}

	public void saveRelationship(BlockRelationship relationship) {
		relationshipRepo.save(relationship);
	}

	private void deleteRelationship(BlockRelationship relationship) {
		relationshipRepo.delete(relationship);
	}

	public long cloneBlock(long id) {
		blockMap = new HashMap<Long, Long>();
		Block clone = getBlock(id);
		long cloned = createBlock(
				new Block(clone.getTitle(), clone.getDescription(), clone.getBlockX(), clone.getBlockY()));
		blockMap.put(id, cloned);
		List<Task> tasks = taskRepo.findByBlockId(id);
		for (Task task : tasks) {
			taskRepo.save(new Task(cloned, task.getTaskListId(), task.getTaskIndex(), task.getTaskName(),
					task.getStatusId(), task.getDisplayDate(), task.getPriorityId()));
		}
		List<BlockRelationship> relationships = getRelationships(id);
		for(BlockRelationship relationship : relationships) {
			createRestOfBlocks(cloned, relationship.getChildId());
		}
		return cloned;
	}

	private void createRestOfBlocks(long parentId, long childId) {
		// create block if it doesn't already exist
		if (blockMap.get(childId) == null) {
			Block clone = getBlock(childId);
			long cloned = createBlock(
					new Block(clone.getTitle(), clone.getDescription(), clone.getBlockX(), clone.getBlockY()));
			blockMap.put(childId, cloned);
			List<Task> tasks = taskRepo.findByBlockId(childId);
			for (Task task : tasks) {
				taskRepo.save(new Task(cloned, task.getTaskListId(), task.getTaskIndex(), task.getTaskName(),
						task.getStatusId(), task.getDisplayDate(), task.getPriorityId()));
			}
			List<BlockRelationship> relationships = getRelationships(childId);
			for(BlockRelationship relationship : relationships) {
				createRestOfBlocks(cloned, relationship.getChildId());
			}
			childId = cloned;
		} else {
			childId = blockMap.get(childId);
		}
		saveRelationship(new BlockRelationship(parentId, childId));
	}

}
