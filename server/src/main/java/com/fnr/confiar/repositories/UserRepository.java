package com.fnr.confiar.repositories;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  public abstract List<User> findAll(Pageable pageable);
  public abstract Optional<User> findByUserName(String user);
  public abstract Optional<User> findByMail(String mail);  
  public abstract List<User> findByProfile(UserProfile profile);
}
