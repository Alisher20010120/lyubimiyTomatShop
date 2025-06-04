package com.example.lyubimiytomatshop.controller;

import com.example.lyubimiytomatshop.dto.CategoryDTO;
import com.example.lyubimiytomatshop.entity.Category;
import com.example.lyubimiytomatshop.repo.CategoryRepository;
import com.example.lyubimiytomatshop.repo.ProductRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryController(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/addCategory")
    public HttpEntity<?> addCategory(@RequestBody CategoryDTO categoryDTO){

        if (categoryRepository.findByName(categoryDTO.getName()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Bunday kategoriya allaqachon mavjud");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryRepository.save(new Category(categoryDTO.getName())));
    }

      @GetMapping("/getcategories")
    public ResponseEntity<List<Category>> getCategories(){
        return ResponseEntity.ok(categoryRepository.findAll());
      }

      @GetMapping("/getProductCountByCategoryId/{categoryId}")
    public HttpEntity<?> getProductCountByCategoryId(@PathVariable Integer categoryId){
          long count = productRepository.findByCategoryId(categoryId).stream().count();
          Map<String,Long> result = new HashMap<>();
          result.put("count",count);
          return ResponseEntity.ok(result);
      }
}
