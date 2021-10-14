package com.fnr.confiar.services;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.repositories.UserProfileRepository;
import com.fnr.confiar.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;
  
  @Autowired
  UserProfileRepository userProfileRepository;

  public List<User> getUsers() {
    return (List<User>) userRepository.findAll();
  }

  public List<UserProfile> getProfiles() {
    return (List<UserProfile>) userProfileRepository.findAll();
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

  public List<User> findByProfile(Short profile) {
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
