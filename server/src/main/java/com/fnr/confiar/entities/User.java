package com.fnr.confiar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Entity
@Table(
  name = "user",
  uniqueConstraints = {
    @UniqueConstraint(name = "user_unique_user_idx", columnNames = {"userName"}),
    @UniqueConstraint(name = "user_unique_mail_idx", columnNames = {"mail"})
  }
)
public class User extends BaseEntity {
  
  @Column(length = 30)
  private String name;
  @Column(length = 30)
  private String lastName;
  @Column(nullable = false)
  private String userName;
  @Column(nullable = false)
  private String mail;
  @Column(nullable = false)
  private String password;
  @ManyToOne
  @JoinColumn(name="PROFILE_ID")
  private UserProfile profile;

}
