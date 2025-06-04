package com.example.lyubimiytomatshop.dto;

import lombok.Value;

@Value
public class ProductDTO {
    String name;
    String description;
    Integer price;
    Integer categoryId;
    String image;
}
