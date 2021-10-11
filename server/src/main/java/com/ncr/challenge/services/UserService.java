package com.ncr.challenge.services;

import java.util.List;
import java.util.Optional;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public List<User> getUsers() {
    return (List<User>) userRepository.findAll();
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

  public List<User> findByStoreId(Long storeId) {
    return userRepository.findByStoreId(storeId);
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
