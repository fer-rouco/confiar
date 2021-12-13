package com.fnr.confiar.models;

import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.utils.StringUtil;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@FieldNameConstants
public class SessionInfoModel extends BaseModel<BaseEntity> {
  private static SessionInfoModel     instance;
  private String                      token;
  private UserInfoData                user;

  public static SessionInfoModel getInstance() {
    if (instance == null) {
      instance = new SessionInfoModel();
    }
    return instance;
  }

  public void generateNewToken() {
    this.setToken(StringUtil.generateNewToken());
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

