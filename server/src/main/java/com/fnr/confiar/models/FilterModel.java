package com.fnr.confiar.models;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

// import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class FilterModel { 
  int pageFrom = 0;
  int pageSize = 10;
  Sort.Direction sortDirection = Sort.Direction.ASC;
  String sortField = BaseModel.Fields.id;
  Map<String, Filter> filters;
  List<String> projectionFields;

  public Pageable getPageable() {
    return PageRequest.of(this.getPageFrom(), this.getPageSize(), Sort.by(this.getSortDirection(), this.getSortField()));
  }
  
  @Data
  @EqualsAndHashCode
  @NoArgsConstructor
  public static class Filter {
    FilterType type;
    String value;
  }
  
  public static enum FilterType {
    TEXT("text"),
    NUMBER("number"),
    ENUM("enum");

    private String value;

    FilterType(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
    
    @JsonCreator
    public static FilterType fromText(String text) {
      for(FilterType filterType : FilterType.values()) {
          if(filterType.toString().equals(text)) {
              return filterType;
          }
      }
      throw new IllegalArgumentException();
    }
  }
}
