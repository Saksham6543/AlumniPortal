package com.example.back.repository;
import com.example.back.model.Stories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StoriesRepository extends JpaRepository<Stories,Long>{

     List<Stories> findByCatagory(String catagory);
}
