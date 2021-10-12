package com.fnr.confiar.controllers;

import com.fnr.confiar.Response;
import com.fnr.confiar.models.StoreModel;
import com.fnr.confiar.services.StoreService;

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
