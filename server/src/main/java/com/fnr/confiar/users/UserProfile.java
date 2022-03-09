package com.fnr.confiar.users;

import com.fnr.confiar.config.persistence.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "profiles")
public class UserProfile extends BaseEntity<Short> {

  @Builder
  public UserProfile(Short id, String description) {
    this.setId(id);
    this.description = description;
  }

  @Column(nullable = false, unique = true)
  private String description;

}