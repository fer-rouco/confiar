package com.fnr.confiar.services;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.repositories.UserProfileRepository;
import com.fnr.confiar.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User> {
  @Autowired
  UserRepository userRepository;
  
  @Autowired
  UserProfileRepository userProfileRepository;

  public long countUsers() {
    return userRepository.count();
  }

  public List<UserProfile> getProfiles() {
    return (List<UserProfile>) userProfileRepository.findAll();
  }
  
  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  public Optional<UserProfile> findProfileById(Long id) {
    return userProfileRepository.findById(id);
  }

  public User saveUser(User userModel) {
    return userRepository.save(userModel);
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> findByUserName(String user) {
    return userRepository.findByUserName(user);
  }

  public Optional<User> findByMail(String mail) {
    return userRepository.findByMail(mail);
  }

  public List<User> findByProfile(UserProfile profile) {
    return userRepository.findByProfile(profile);
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
