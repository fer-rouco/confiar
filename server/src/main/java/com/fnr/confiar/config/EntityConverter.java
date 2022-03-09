package com.fnr.confiar.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.fnr.confiar.config.persistence.BaseEntity;

import org.modelmapper.ModelMapper;
import org.springframework.core.convert.converter.Converter;

public abstract class EntityConverter<E extends BaseEntity<?>, DTO extends DataTransferObjectInterface<? extends Number>> implements Converter<E, DTO> {
  
  public abstract E convert(DTO source);
  
  public DTO convert(Optional<E> source) {
    return (!source.isEmpty()) ? this.convert(source.get()) : null;
  }

  // public List<DTO> convert(Collection<E> sources) {
  //   return sources.stream().map((source) -> { return this.convert(source); }).collect(Collectors.toList());
  // }

  public List<DTO> convert(Collection<E> sources) {
    List<DTO> convertedList = null;
    if (sources != null) {
      convertedList = sources.stream().map((source) -> { return this.convert(source); }).collect(Collectors.toList());
    }
    return convertedList;
  }

  public List<DTO> convert(Iterable<E> sources) {
    List<DTO> convertedList = null;
    if (sources != null) {
      convertedList = StreamSupport.stream(sources.spliterator(), false).map(source -> this.convert(source)).collect(Collectors.toList());
    }
    return convertedList;
  }
 
  public List<E> convertToEntity(Collection<DTO> sources) {
    List<E> convertedList = null;
    if (sources != null) {
      convertedList = sources.stream().map((source) -> { return this.convert(source); }).collect(Collectors.toList());
    }
    return convertedList;
  }

  public List<E> convertToEntity(Iterable<DTO> sources) {
    List<E> convertedList = null;
    if (sources != null) {
      convertedList = StreamSupport.stream(sources.spliterator(), false).map(source -> this.convert(source)).collect(Collectors.toList());
    }
    return convertedList;
  }

  public E convert(Map<String, Object> map, Class<E> entityClass) {
    ModelMapper modelMapper = new ModelMapper();
    return modelMapper.map(map, entityClass);
  }

  // public E convert(Map<String, Object> map, Class<E> entityClass) {
  //   E instance;
  //   try {
  //     instance = entityClass.getDeclaredConstructor().newInstance();
  //   } catch (Exception e) {
  //     throw new RuntimeException(e);
  //   }

  //   map.entrySet().forEach((Entry<String, Object> entry) -> {
  //     String attribute = entry.getKey().substring(0, 1).toUpperCase() + entry.getKey().substring(1);
  //     Method setMethod = null;
  //     try {
  //       setMethod = instance.getClass().getMethod("set" + attribute, new Class[]{String.class});
  //     } catch (NoSuchMethodException | SecurityException e) {
  //       e.printStackTrace();
  //     }
  //     try {
  //       setMethod.invoke(instance, entry.getValue());
  //     } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
  //       e.printStackTrace();
  //     }
  //   });

  //   return instance;
  // }
 
}
