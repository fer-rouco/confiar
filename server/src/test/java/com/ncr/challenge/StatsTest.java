package com.ncr.challenge;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.models.StatsModel;
import com.ncr.challenge.repositories.UserRepository;
import com.ncr.challenge.services.StatsService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class StatsTest {
  
  @Autowired
  private UserRepository userRepository;
  
  @Test
  void testCalculateStats() {
    StatsService statsService = new StatsService();
    ArrayList<User> users = userRepository.findByStoreId(1L);
    StatsModel stats = statsService.calculateStats(users);
    assertEquals(2, stats.getNumberOfCashiers());
    assertEquals(1, stats.getNumberOfSupervisors());
    assertEquals(66, stats.getPercentageOfCashiersOverTotalUsers());
    assertEquals(33, stats.getPercentageOfSupervisorsOverTotalUsers());

    users = userRepository.findByStoreId(2L);
    stats = statsService.calculateStats(users);
    assertEquals(1, stats.getNumberOfCashiers());
    assertEquals(1, stats.getNumberOfSupervisors());
    assertEquals(50, stats.getPercentageOfCashiersOverTotalUsers());
    assertEquals(50, stats.getPercentageOfSupervisorsOverTotalUsers());
    
    users = userRepository.findByStoreId(4L);
    stats = statsService.calculateStats(users);
    assertEquals(3, stats.getNumberOfCashiers());
    assertEquals(1, stats.getNumberOfSupervisors());
    assertEquals(75, stats.getPercentageOfCashiersOverTotalUsers());
    assertEquals(25, stats.getPercentageOfSupervisorsOverTotalUsers());
    
    users = userRepository.findByStoreId(5L);
    stats = statsService.calculateStats(users);
    assertEquals(0, stats.getNumberOfCashiers());
    assertEquals(1, stats.getNumberOfSupervisors());
    assertEquals(0, stats.getPercentageOfCashiersOverTotalUsers());
    assertEquals(100, stats.getPercentageOfSupervisorsOverTotalUsers());
  }

}
