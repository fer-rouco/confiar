package com.ncr.challenge.repositories;

import com.ncr.challenge.entities.Store;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {
}
