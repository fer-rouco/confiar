package com.fnr.confiar.models;

import java.util.Date;

import com.fnr.confiar.entities.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class DocumentModel extends BaseModel<Document> {

  private String name;
  private String extension;
  private String type;
  private Integer size;
  private Short orderNumber;
  private Date lastModified;
  private byte[] content;

}