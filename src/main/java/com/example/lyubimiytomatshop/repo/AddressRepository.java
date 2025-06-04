package com.example.lyubimiytomatshop.repo;

import com.example.lyubimiytomatshop.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}