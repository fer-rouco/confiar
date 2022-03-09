package com.fnr.confiar.generic.converters;

import com.fnr.confiar.base.EntityConverter;
import com.fnr.confiar.generic.dtos.DocumentDTO;
import com.fnr.confiar.generic.entities.Document;

import org.springframework.stereotype.Component;

@Component
public class DocumentConverter extends EntityConverter<Document, DocumentDTO> {
  @Override public DocumentDTO convert( Document source ) {
    DocumentDTO to = DocumentDTO.builder()
      .name(source.getName())
      .extension(source.getExtension())
      .type(source.getType())
      .size(source.getSize())
      .orderNumber(source.getOrderNumber())
      .lastModified(source.getLastModified())
      .content(source.getContent())
      .build();
    to.setId(source.getId());
    return to;
  }
  
  @Override public Document convert( DocumentDTO source ) {
    Document to = Document.builder()
      .name(source.getName())
      .extension(source.getExtension())
      .type(source.getType())
      .size(source.getSize())
      .orderNumber(source.getOrderNumber())
      .lastModified(source.getLastModified())
      .content(source.getContent())
      .build();
    to.setId(source.getId());
    return to;
  }
  
}
