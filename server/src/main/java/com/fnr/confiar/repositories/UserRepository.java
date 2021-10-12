package com.fnr.confiar.repositories;

import java.util.ArrayList;
import java.util.Optional;

import com.fnr.confiar.entities.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  public abstract Optional<User> findByUserName(String user);
  public abstract Optional<User> findByMail(String mail);  
  public abstract ArrayList<User> findByProfile(Short profile);
  public abstract ArrayList<User> findByStoreId(Long storeId);
}
