package com.fnr.confiar.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.FilterModel;

import org.springframework.beans.factory.annotation.Autowired;

public class BaseService<E extends BaseEntity> {
  
  @Autowired
  public EntityManager entityManager;
    
  public List<E> findByFilters(FilterModel filter, Class<E> entityClass) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<E> createQuery = criteriaBuilder.createQuery(entityClass);

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

    TypedQuery<E> query = entityManager.createQuery(createQuery);
    return query.getResultList();
  }
}
