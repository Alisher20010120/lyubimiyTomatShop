package com.example.lyubimiytomatshop.entity;

import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import jakarta.persistence.Entity;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Category extends BaseEntity {
    private String name;
}
