package com.example.lyubimiytomatshop.entity;

import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class AttachmentContent extends BaseEntity {
    public byte[] content;
    @OneToOne
    @JoinColumn(name = "attachment_id", nullable = false)
    @JsonBackReference
    private Attachment attachment;
}
