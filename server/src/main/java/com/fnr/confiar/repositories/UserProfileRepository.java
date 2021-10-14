package com.fnr.confiar.repositories;

import com.fnr.confiar.entities.UserProfile;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {
}
