package com.ncr.challenge.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
@Table(
  name = "user",
  uniqueConstraints = {
    @UniqueConstraint(name = "user_unique_user_idx", columnNames = {"userName"}),
    @UniqueConstraint(name = "user_unique_mail_idx", columnNames = {"mail"})
  }
)
public class User extends BaseEntity {
  
  private String name;
  private String lastName;
  private String userName;
  private String mail;
  private String password;
  private Short profile;
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  private Store store;

}
