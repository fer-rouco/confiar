package com.fnr.confiar.modules.session;

import com.fnr.confiar.base.BaseDTO;
import com.fnr.confiar.utils.StringUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@FieldNameConstants
public class SessionInfoDTO extends BaseDTO<Short> {
  private static SessionInfoDTO     instance;
  private String                      token;
  private UserInfoData                user;

  public static SessionInfoDTO getInstance() {
    if (instance == null) {
      instance = new SessionInfoDTO();
    }
    return instance;
  }

  public void generateNewToken() {
    this.setToken(StringUtils.generateNewToken());
  }

  @Data
  @NoArgsConstructor
  @FieldNameConstants
  public static class UserInfoData {
    public String                   id         = "";
    public int                      language   = 1; //Locale.LANGUAGE_DE;
    public int                      country    = 54; //Locale.COUNTRY_CH;
  
    public int[]                    functionRights = null;
    public int[]                    moduleRights   = null;
  }
}

