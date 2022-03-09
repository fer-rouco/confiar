package com.fnr.confiar.modules.users;

import com.fnr.confiar.base.BaseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO extends BaseDTO<Short> {

  private String description;
  
}