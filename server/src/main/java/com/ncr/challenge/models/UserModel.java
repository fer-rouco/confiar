package com.ncr.challenge.models;

import com.ncr.challenge.entities.User;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserModel extends BaseModel<User> {

  private String name;
  private String lastName;
  private String userName;
  private String mail;
  private String password;
  private Short profile;
  private StoreModel store;

  public UserModel(User entity) {
    super(entity);
  }
  
}
