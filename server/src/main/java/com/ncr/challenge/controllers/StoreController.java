package com.ncr.challenge.controllers;

import com.ncr.challenge.Response;
import com.ncr.challenge.models.StoreModel;
import com.ncr.challenge.services.StoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
public class StoreController extends BaseController {
  @Autowired
  StoreService storeService;

  @GetMapping()
  public ResponseEntity<Response> getStores() {
    return responseEntityList(storeService.getStores(), StoreModel.class);
  }
  
}
