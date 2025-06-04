package com.example.lyubimiytomatshop.repo;

import com.example.lyubimiytomatshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}