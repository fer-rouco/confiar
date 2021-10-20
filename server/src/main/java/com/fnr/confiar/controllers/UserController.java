package com.fnr.confiar.controllers;

import com.fnr.confiar.Response;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.models.UserProfileModel;
import com.fnr.confiar.models.PaginatorModel;
import com.fnr.confiar.models.UserModel;
import com.fnr.confiar.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController extends BaseController {
  @Autowired
  UserService userService;

  @PostMapping()
  public ResponseEntity<Response> findUsers(@RequestParam("pageFrom") int pageFrom, @RequestParam("pageSize") int pageSize) {  
    PaginatorModel<UserModel> paginator = new PaginatorModel<UserModel>();
    paginator.setRowObjects(convertEntityListToModel(userService.findUsers(pageFrom, pageSize), UserModel.class));
    paginator.setLength(userService.countUsers());
    return responseOk(paginator);
  }
  
  @GetMapping("/profiles")
  public ResponseEntity<Response> getProfiles() {
    return responseEntityList(userService.getProfiles(), UserProfileModel.class);
  }

  @PostMapping("/update")
  public ResponseEntity<Response> update(@RequestBody UserModel userModel) {
    return createOrUpdateUser(userModel);
  }

  private ResponseEntity<Response> createOrUpdateUser(UserModel userModel) {
    ResponseEntity<Response> response = null;

    User user = (User) userModel.toEntity();

    try {
      response = responseOk(userService.saveUser(user), UserModel.class);
    }
    catch(DataIntegrityViolationException ex) {
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_USER_IDX") > -1) {
        response = responseConflictError(null, "El usuario ingresado ya existe. Ingrese uno diferente.", UserModel.Fields.userName, UserModel.class);
      }
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_MAIL_IDX") > -1) {
        response = responseConflictError(null, "El mail ingresado ya existe. Ingrese uno diferente.", UserModel.Fields.mail, UserModel.class);
      }
    }

    return response;
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Response> getUserById(@PathVariable("id") Long id) {
    return responseOk(userService.findById(id), UserModel.class);
  }

  @GetMapping("/byProfile")
  public ResponseEntity<Response> getUsersByProfile(@RequestParam("profile") Long profile) {
    return responseEntityList(userService.findByProfile(userService.findByProfileById(profile).get()), UserModel.class);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
    return (userService.deleteUser(id)) ? responseOk() : responseConflictError("No se pudo eliminar el usuario.", UserModel.class);
  }
  
}
