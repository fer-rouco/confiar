package com.ncr.challenge.controllers;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.models.UserModel;
import com.ncr.challenge.services.StoreService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController extends BaseController {
  @Autowired
  UserService userService;
  @Autowired
  StoreService storeService;

  @GetMapping()
  public ResponseEntity<Response> getUsers() {
    return responseEntityList(userService.getUsers(), UserModel.class);
  }

  @PostMapping("/create")
  public ResponseEntity<Response> create(@RequestBody UserModel userModel) {
    return createOrUpdateUser(true, userModel);
  }
  
  @PutMapping("/update")
  public ResponseEntity<Response> update(@RequestBody UserModel userModel) {
    return createOrUpdateUser(false, userModel);
  }

  private ResponseEntity<Response> createOrUpdateUser(Boolean create, UserModel userModel) {
    User user = null;
    if (create) {
      user = new User();
    }
    else {
      user = userService.findById(userModel.getId()).get();
    }

    user = (User) userModel.toEntity();

    ResponseEntity<Response> response = null;
    try {
      response = responseOk(userService.saveUser(user), UserModel.class);
    }
    catch(DataIntegrityViolationException ex) {
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_USER_IDX") > -1) {
        response = responseConflictError(null, "El usuario ingresado ya existe. Ingrese uno diferente.", "user", UserModel.class);
      }
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_MAIL_IDX") > -1) {
        response = responseConflictError(null, "El mail ingresado ya existe. Ingrese uno diferente.", "mail", UserModel.class);
      }
    }

    return response;
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Response> getUserById(@PathVariable("id") Long id) {
    return responseOk(userService.findById(id), UserModel.class);
  }

  @GetMapping("/byStoreId/{id}")
  public ResponseEntity<Response> getUsersByStoreId(@PathVariable("id") Long storeId) {
    return responseEntityList(userService.findByStoreId(storeId), UserModel.class);
  }

  @GetMapping("/byProfile")
  public ResponseEntity<Response> getUsersByProfile(@RequestParam("profile") Short profile) {
    return responseEntityList(userService.findByProfile(profile), UserModel.class);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
    return (userService.deleteUser(id)) ? responseOk() : responseConflictError("No se pudo eliminar el usuario.", UserModel.class);
  }
  
}
