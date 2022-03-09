package com.fnr.confiar.users;

import com.fnr.confiar.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name = "users")
public class User extends BaseEntity<Long> {

  @Builder
  public User(Long id, String name, String lastName, String userName, String mail, byte[] password, UserProfile profile) {
    this.setId(id);
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.mail = mail;
    this.password = password;
    this.profile = profile;
  }

  @Column(length = 30)
  private String name;
  @Column(length = 30)
  private String lastName;
  @Column(nullable = false, unique = true)
  private String userName;
  @Column(nullable = false, unique = true)
  private String mail;
  @Column(nullable = false)
  private byte[] password;
  @ManyToOne
  @JoinColumn(name="PROFILE_ID")
  private UserProfile profile;

}
