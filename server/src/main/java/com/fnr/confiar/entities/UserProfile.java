package com.fnr.confiar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "profile")
public class UserProfile extends BaseEntity {

  @Column(nullable = false, unique = true)
  private String description;

}