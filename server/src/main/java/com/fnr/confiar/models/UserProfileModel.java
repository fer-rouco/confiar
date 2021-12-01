package com.fnr.confiar.models;

import com.fnr.confiar.entities.UserProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileModel extends BaseModel<UserProfile> {

  private String description;

  public UserProfileModel(UserProfile entity) {
    super(entity);
  }
  
}