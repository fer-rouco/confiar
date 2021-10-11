package com.ncr.challenge.controllers;

import java.util.List;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.services.StatsService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
public class StatsController extends BaseController {
  @Autowired
  StatsService statsService;

  @Autowired
  UserService userService;

  @GetMapping(path = "/{storeId}")
  public ResponseEntity<Response> calculateStats(@PathVariable("storeId") Long storeId) {
    List<User> users = userService.findByStoreId(storeId);
    return this.responseOk(statsService.calculateStats(users));
  }
}
