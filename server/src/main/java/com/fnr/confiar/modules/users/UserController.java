package com.fnr.confiar.modules.users;

import com.fnr.confiar.base.BaseController;
import com.fnr.confiar.base.BaseDTO;
import com.fnr.confiar.base.Response;
import com.fnr.confiar.generic.dtos.FilterDTO;

import org.springframework.beans.factory.annotation.Autowired;
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
  public ResponseEntity<Response> findUsers(@RequestBody FilterDTO filters) {  
    return responseOk(userService.createPaginator(filters));
  }
  
  @GetMapping("/profiles")
  public ResponseEntity<Response> getProfiles() {
    return responseList(userService.getProfiles());
  }

  @PostMapping("/update")
  public ResponseEntity<Response> update(@RequestBody UserDTO userDTO) {
    return responseOk(userService.saveUser(userDTO));
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Response> getUserById(@PathVariable(BaseDTO.Fields.id) Long id) {
    return responseOk(userService.findById(id));
  }

  @GetMapping("/byProfile")
  public ResponseEntity<Response> getUsersByProfile(@RequestParam(UserDTO.Fields.profile) Long profile) {
    return responseList(userService.findByProfile(userService.findProfileById(profile)));
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable(BaseDTO.Fields.id) Long id) {
    return (userService.deleteUser(id)) ? responseOk() : responseConflictError("No se pudo eliminar el usuario.");
  }
  
}
