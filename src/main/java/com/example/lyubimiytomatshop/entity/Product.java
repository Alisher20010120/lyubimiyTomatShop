package com.example.lyubimiytomatshop.entity;

import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Product extends BaseEntity {
    private String name;
    private String description;
    private Double price;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachment;
    @ManyToOne
    private Category category;
}
