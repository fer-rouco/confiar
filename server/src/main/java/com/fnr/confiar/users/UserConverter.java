package com.fnr.confiar.users;

import com.fnr.confiar.config.EntityConverter;

import org.springframework.stereotype.Component;

@Component
public class UserConverter extends EntityConverter<User, UserDTO> {
  @Override public UserDTO convert( User source ) {
    UserDTO to = UserDTO.builder()
      .name(source.getName())
      .lastName(source.getLastName())
      .userName(source.getUserName())
      .mail(source.getMail())
      .password(source.getPassword())
      .profile(new UserProfileConverter().convert(source.getProfile()))
      .build();
    to.setId(source.getId());
    return to;
  }
  
  @Override public User convert( UserDTO source ) {
    User to = User.builder()
      .name(source.getName())
      .lastName(source.getLastName())
      .userName(source.getUserName())
      .mail(source.getMail())
      .password(source.getPassword())
      .profile(new UserProfileConverter().convert(source.getProfile()))
      .build();
    to.setId(source.getId());
    return to;
  }
}
