package com.example.lyubimiytomatshop.repo;

import com.example.lyubimiytomatshop.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}