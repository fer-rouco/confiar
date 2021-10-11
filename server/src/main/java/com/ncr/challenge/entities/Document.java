package com.ncr.challenge.entities;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "document")
public class Document extends BaseEntity {

  private String name;
  private String extension;
  private String type;
  private Integer size;
  private Short orderNumber;
  private Date lastModified;
  
  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(columnDefinition = "LONGBLOB", nullable = false)
  private byte[] content;

}