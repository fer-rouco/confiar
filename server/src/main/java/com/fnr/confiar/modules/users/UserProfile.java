package com.fnr.confiar.modules.users;

import com.fnr.confiar.base.BaseEntity;

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