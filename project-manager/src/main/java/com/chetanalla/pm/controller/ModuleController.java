package com.chetanalla.pm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chetanalla.pm.dao.ModuleDao;
import com.chetanalla.pm.model.Module;

@RestController
public class ModuleController {

	@Autowired
	private ModuleDao dao;
	
	@RequestMapping("/add")
	public String addModule(Module module) {
		dao.save(module);
		return module.toString();
	}
	
}
