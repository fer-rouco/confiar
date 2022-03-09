package com.fnr.confiar.modules.users;

import java.util.List;

import com.fnr.confiar.base.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User> {
  @Autowired
  UserRepository userRepository;
  
  @Autowired
  UserProfileRepository userProfileRepository;

  @Autowired
  UserConverter userConverter;

  @Autowired
  UserProfileConverter userProfileConverter;

  @Override
  protected Class<User> getClazz() {
    return User.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  protected UserConverter getConverter() {
    return this.userConverter;
  }
 
  // public PaginatorDTO<?> createPaginator(FilterDTO filters) {
  //   PaginatorDTO<UserDTO> paginator = new PaginatorDTO<UserDTO>();
  //   paginator.setRowObjects(userConverter.convert(findByFilters(filters, userConverter, User.class)));
  //   paginator.setLength(countByFilters(filters, User.class));
  //   return paginator;
  // }

  public long countUsers() {
    return userRepository.count();
  }

  public List<UserProfileDTO> getProfiles() {
    return userProfileConverter.convert(userProfileRepository.findAll());
  }
  
  public List<UserDTO> findAll() {
    return userConverter.convert(userRepository.findAll());
  }

  public UserProfileDTO findProfileById(Long id) {
    return userProfileConverter.convert(userProfileRepository.findById(id));
  }

  public UserDTO saveUser(UserDTO userModel) {
    return userConverter.convert(userRepository.save(userConverter.convert(userModel)));
  }

  public UserDTO findById(Long id) {
    return userConverter.convert(userRepository.findById(id));
  }

  public UserDTO findByUserName(String user) {
    return userConverter.convert(userRepository.findByUserName(user));
  }

  public UserDTO findByMail(String mail) {
    return userConverter.convert(userRepository.findByMail(mail));
  }

  public List<UserDTO> findByProfile(UserProfileDTO profile) {
    return userConverter.convert(userRepository.findByProfile(userProfileConverter.convert(profile)));
  }

  public boolean deleteUser(Long id) {
    try {
      userRepository.deleteById(id);
      return true;
    }
    catch (Exception exception) {
      return false;
    }
  }

}
