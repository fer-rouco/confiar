package com.fnr.confiar.generic.dtos;

import java.util.Date;

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
public class DocumentDTO extends BaseDTO<Long> {

  private String name;
  private String extension;
  private String type;
  private Integer size;
  private Short orderNumber;
  private Date lastModified;
  private byte[] content;

}