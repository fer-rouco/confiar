package com.fnr.confiar.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.models.UserModel;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseService<E extends BaseEntity> {
  
  @Autowired
  public EntityManager entityManager;
    
  public List<E> findByFilters(FilterModel filter, Class<E> entityClass) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    // CriteriaQuery<E> createQuery = criteriaBuilder.createQuery(entityClass);
    CriteriaQuery<Tuple> createQuery = criteriaBuilder.createTupleQuery();

    Root<E> root = createQuery.from(entityClass);

    List<Predicate> predicates = new ArrayList<>();
    for (Map.Entry<String, String> filterItem : filter.getFilters().entrySet()) {
      String value = String.format(QueryConstants.LIKE, (filterItem.getValue() != null) ? filterItem.getValue().toLowerCase(): "");
      Predicate predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get(filterItem.getKey())), value);
      predicates.add(predicate);
    }
  
    createQuery.where(predicates.toArray(Predicate[]::new));

    List<Path<E>> paths = new ArrayList<>();
    for (String projectionField : filter.getProjectionFields()) {
      paths.add(root.get(projectionField.split("\\.")[0]));
    }
    createQuery.multiselect(paths.toArray(Path[]::new));

    // TypedQuery<E> query = entityManager.createQuery(createQuery);
    TypedQuery<Tuple> query = entityManager
      .createQuery(createQuery)
      .setMaxResults(filter.getPageSize())
      .setFirstResult(filter.getPageSize() * filter.getPageFrom());

    ModelMapper modelMapper = new ModelMapper();
    List<E> list = query.getResultList().stream().map((Tuple tuple) -> { 
      Map<String, Object> maps = new HashMap<>();

      Short tupleIndex = 0;
      for (String projectionField : filter.getProjectionFields()) {
        maps.put(projectionField, tuple.get(tupleIndex++));
      }
      return modelMapper.map(maps, entityClass);
    } ).collect(Collectors.toList());

    return list;
  }
}
