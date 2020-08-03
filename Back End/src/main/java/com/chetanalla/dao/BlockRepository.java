package com.chetanalla.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.chetanalla.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long>{
}
