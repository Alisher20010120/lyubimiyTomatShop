package com.example.lyubimiytomatshop.entity;


import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Attachment extends BaseEntity {
 private String filename;

 @OneToOne(mappedBy = "attachment", cascade = CascadeType.ALL, orphanRemoval = true)
 @JsonManagedReference
 private AttachmentContent attachmentContent;
}
