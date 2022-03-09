package com.fnr.confiar.generic.entities;

import java.util.Date;

import com.fnr.confiar.base.BaseEntity;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "documents")
public class Document extends BaseEntity<Long> {

  @Column(nullable = false, length = 50)
  private String name;
  @Column(length = 10)
  private String extension;
  @Column(nullable = false, length = 50)
  private String type;
  private Integer size;
  private Short orderNumber;
  private Date lastModified;
  
  @Lob
  @Basic(fetch = FetchType.LAZY)
  @Column(columnDefinition = "LONGBLOB", nullable = false)
  private byte[] content;

}