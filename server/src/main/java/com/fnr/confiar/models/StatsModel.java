package com.fnr.confiar.models;

import com.fnr.confiar.entities.BaseEntity;

import lombok.Data;

@Data
public class StatsModel extends BaseModel<BaseEntity> {
  
  public StatsModel() {
    super(null);
  }

  private short numberOfCashiers;
  private short numberOfSupervisors;
  private float percentageOfCashiersOverTotalUsers;
  private float percentageOfSupervisorsOverTotalUsers;
  
}
