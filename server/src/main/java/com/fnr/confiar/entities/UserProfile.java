package com.fnr.confiar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "profile")
public class UserProfile extends BaseEntity {

  @Builder
  public UserProfile(Long id, String description) {
    super(id);
    this.description = description;
  }

  @Column(nullable = false, unique = true)
  private String description;

}