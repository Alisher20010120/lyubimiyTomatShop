package com.example.lyubimiytomatshop.entity;

import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Address extends BaseEntity {
    private String title;

    private double latitude;

    private double longitude;

    private String description;

    @ManyToOne
    private Users user;
}
