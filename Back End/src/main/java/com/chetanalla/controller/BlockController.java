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

import com.chetanalla.model.Block;
import com.chetanalla.model.BlockRelationship;
import com.chetanalla.service.BlockService;

@RequestMapping("/block")
@RestController
public class BlockController {

	@Autowired
	private BlockService service;
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> modBlockTable(@RequestBody Block block) {
		service.saveBlock(block);
		return ResponseEntity.ok(block);
	}
	
	@RequestMapping("/clone/{id}")
	@ResponseBody
	public String cloneBlock(@PathVariable String id) {
		long blockId = Long.parseLong(id);
		long clone = service.cloneBlock(blockId);
		return clone + "";
	}
	
	@RequestMapping("/get/{id}")
	@ResponseBody
	public ResponseEntity<?> getBlock(@PathVariable String id) {
		long blockId = Long.parseLong(id);
		Block block = service.getBlock(blockId);
		return ResponseEntity.ok(block);
	}
	
	@RequestMapping("/getall")
	@ResponseBody
	public ResponseEntity<?> getAllBlocks() {
		List<Block> blocks = service.getAllBlocks();
		return ResponseEntity.ok(blocks);
	}
	
	@RequestMapping("/delete/{id}")
	public void deleteBlock(@PathVariable String id) {
		long blockId = Long.parseLong(id);
		service.deleteBlock(blockId);
	}
	
	@RequestMapping(value = "/addrelationship", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> addRelationship(@RequestBody BlockRelationship relationship) {
		service.saveRelationship(relationship);
		return ResponseEntity.ok(relationship);
	}
	
	@RequestMapping("/getrelationships/{id}")
	@ResponseBody
	public ResponseEntity<?> getRelationships(@PathVariable String id) {
		List<BlockRelationship> relationships = service.getRelationships(Long.parseLong(id));
		return ResponseEntity.ok(relationships);
	}
	
}
