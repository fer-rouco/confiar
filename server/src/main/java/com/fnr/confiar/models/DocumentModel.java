package com.fnr.confiar.models;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

import com.fnr.confiar.entities.Document;

import org.modelmapper.Converter;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DocumentModel extends BaseModelWithConverters<Document> {

  private String name;
  private String extension;
  private String type;
  private Integer size;
  private Short orderNumber;
  private Date lastModified;
  private byte[] content;

  protected Converter<String, String> addConverter() {
    return new Converter<String, String>() {
      public String convert(MappingContext<String, String> context) {
        return context.getSource() == null ? null : context.getSource().toUpperCase();
      }
    };
  }

  protected void createTypeMap() {
    Converter<String, byte[]> contentConverter =
    ctx -> ctx.getSource() == null ? null : ctx.getDestination();

    TypeMap<Document, DocumentModel> typeMap = BaseModel.modelMapper.createTypeMap(Document.class, DocumentModel.class);
    typeMap.addMappings(mapper -> mapper.using(contentConverter).map(Document::getContent, DocumentModel::setContentFromString));
  }

  public byte[] getContent() {
    return this.content;
  }

  public void setContentFromString(String content) {
    try {
      byte[] decodedString = Base64.getDecoder().decode(new String(content).getBytes("UTF-8"));
      this.content = decodedString;
    } catch (UnsupportedEncodingException e) {
        // e.printStackTrace();
    }
  }

  public void setContent(byte[] content) {
    this.content = content;
  }

}