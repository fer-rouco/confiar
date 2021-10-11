package com.ncr.challenge.models;

import com.ncr.challenge.entities.BaseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SessionInfoModel extends BaseModel<BaseEntity> {
  private static SessionInfoModel     instance;
  private UserInfoData                user;

  public static SessionInfoModel getInstance() {
    if (instance == null) {
      instance = new SessionInfoModel();
    }
    return instance;
  }

  @Data
  @NoArgsConstructor
  public static class UserInfoData {
    public String                   id         = "";
    public int                      language   = 1; //Locale.LANGUAGE_DE;
    public int                      country    = 54; //Locale.COUNTRY_CH;
  
    public int[]                    functionRights = null;
    public int[]                    moduleRights   = null;
  }
}

