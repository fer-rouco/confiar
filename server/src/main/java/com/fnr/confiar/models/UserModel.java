package com.fnr.confiar.models;

import com.fnr.confiar.entities.User;


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
  private UserProfileModel profile;

  public UserModel(User entity) {
    super(entity);
  }
  
}
