package com.fnr.confiar.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "store")
public class Store extends BaseEntity {

  private Short number;
  private String name;

}
