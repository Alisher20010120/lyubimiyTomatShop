package com.example.lyubimiytomatshop.entity;

import com.example.lyubimiytomatshop.entity.baseEntity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "roles")
public class Role extends BaseEntity implements GrantedAuthority {
    @Enumerated(EnumType.STRING)
    private RoleName roleName;

    @Override
    public String getAuthority() {
        return roleName.name();
    }
    public Role(Long id, RoleName roleName) {
        this.roleName = roleName;
    }
}
