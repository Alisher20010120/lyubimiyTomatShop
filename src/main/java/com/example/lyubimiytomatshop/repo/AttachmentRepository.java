package com.example.lyubimiytomatshop.repo;

import com.example.lyubimiytomatshop.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {
}