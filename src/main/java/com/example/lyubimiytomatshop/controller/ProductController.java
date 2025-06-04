package com.example.lyubimiytomatshop.controller;

import com.example.lyubimiytomatshop.entity.Attachment;
import com.example.lyubimiytomatshop.entity.AttachmentContent;
import com.example.lyubimiytomatshop.entity.Category;
import com.example.lyubimiytomatshop.entity.Product;
import com.example.lyubimiytomatshop.repo.AttachmentContentRepository;
import com.example.lyubimiytomatshop.repo.AttachmentRepository;
import com.example.lyubimiytomatshop.repo.CategoryRepository;
import com.example.lyubimiytomatshop.repo.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final AttachmentRepository attachmentRepository;
    private final AttachmentContentRepository attachmentContentRepository;

    public ProductController(CategoryRepository categoryRepository, ProductRepository productRepository, AttachmentRepository attachmentRepository, AttachmentContentRepository attachmentContentRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.attachmentRepository = attachmentRepository;
        this.attachmentContentRepository = attachmentContentRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/addProducts")
    public HttpEntity<?> addProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Integer price,
            @RequestParam Integer categoryId,
            @RequestParam MultipartFile image
    ) throws IOException {
        Attachment attachment =Attachment.builder()
                .filename(image.getOriginalFilename())
                .build();
        AttachmentContent attachmentContent=AttachmentContent.builder()
                .attachment(attachment)
                .content(image.getBytes())
                .build();
        Category category = categoryRepository.findById(categoryId).orElseThrow();
        double price1 = Double.parseDouble(price.toString());
        Product product = Product.builder()
                .name(name)
                .description(description)
                .attachment(new ArrayList<>(List.of(attachment)))
                .category(category)
                .price(price1)
                .build();
        attachmentRepository.save(attachment);
        attachmentContentRepository.save(attachmentContent);
        productRepository.save(product);
        return ResponseEntity.ok().build();
    }

   @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/product")
    public List<Product> getProducts(@RequestParam(value = "categoryId", required = false) Integer categoryId) {
        if (categoryId == null || categoryId == 0) {
            return productRepository.findAll();
        } else {
            return productRepository.findByCategoryId(categoryId);
        }
    }


    @DeleteMapping("/deleteproduct/{id}")
    public HttpEntity<?> deleteProduct(@PathVariable Integer id){
       productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/searchproduct")
    public List<Product> searchByName(@RequestParam String search) {
        return productRepository.findByNameIlike(search);
    }

    @GetMapping("/editproduct/{id}")
    public HttpEntity<?> editProduct(@PathVariable Integer id){
        return ResponseEntity.ok(productRepository.findById(id));
    }

    @Transactional
    @PutMapping("/updateproduct")
    public HttpEntity<?> editProduct(
            @RequestParam Integer productId,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Double price,
            @RequestParam Integer categoryId,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        Product product = productRepository.findById(productId).orElseThrow();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(categoryRepository.findById(categoryId).orElseThrow());


        if (image != null && !image.isEmpty()) {
            Attachment attachment = Attachment.builder()
                    .filename(image.getOriginalFilename())
                    .build();
            AttachmentContent attachmentContent = AttachmentContent.builder()
                    .attachment(attachment)
                    .content(image.getBytes())
                    .build();
            attachmentRepository.save(attachment);
            attachmentContentRepository.save(attachmentContent);

            product.setAttachment(new ArrayList<>(List.of(attachment)));
        }

        productRepository.save(product);
        return ResponseEntity.ok().build();
    }

      @GetMapping("/getproducts")
      public HttpEntity<?> getProducts(){
          List<Product> all = productRepository.findAll();
          for (int i = 0; i < all.size(); i++) {
              System.out.println(all.get(i).getName());
          }
          return ResponseEntity.ok(all);
      }


      @GetMapping("/productsid/{id}")
    public HttpEntity<?> getProductsById(@PathVariable Integer id){
          Product product = productRepository.findById(id).orElseThrow();
          return ResponseEntity.ok(product);
      }

}

