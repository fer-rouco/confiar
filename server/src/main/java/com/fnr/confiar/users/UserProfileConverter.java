package com.fnr.confiar.users;

import com.fnr.confiar.base.EntityConverter;

import org.springframework.stereotype.Component;

@Component
public class UserProfileConverter extends EntityConverter<UserProfile, UserProfileDTO> {
  @Override public UserProfileDTO convert( UserProfile source ) {
    UserProfileDTO to = UserProfileDTO.builder()
      .description(source.getDescription())
      .build();
    to.setId(source.getId());
    return to;
  }
  
  @Override public UserProfile convert( UserProfileDTO source ) {
    UserProfile to = UserProfile.builder()
      .description(source.getDescription())
      .build();
    to.setId(source.getId());
    return to;
  }
}