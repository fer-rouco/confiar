package com.fnr.confiar.models;

import com.fnr.confiar.entities.UserProfile;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfileModel extends BaseModel<UserProfile> {

  private String description;

  public UserProfileModel(UserProfile entity) {
    super(entity);
  }
  
}