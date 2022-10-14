package com.fnr.confiar.generic.entities;

import java.util.Date;

import com.fnr.confiar.base.BaseEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.Table;
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