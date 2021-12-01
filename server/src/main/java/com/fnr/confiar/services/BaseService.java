package com.fnr.confiar.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.repositories.specs.GenericSpecificationsBuilder;
import com.fnr.confiar.repositories.specs.SpecificationFactory;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.Assert;

public class BaseService<E extends BaseEntity> {

  
  @Autowired
  private SpecificationFactory<E> specificationFactory;
  
  @Autowired
  public EntityManager entityManager;
   
  // public List<E> findByFiltersCriteria(FilterModel filter, Class<E> entityClass) {
  //   CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
  //   // CriteriaQuery<E> createQuery = criteriaBuilder.createQuery(entityClass);
  //   CriteriaQuery<Tuple> createQuery = criteriaBuilder.createTupleQuery();

  //   Root<E> root = createQuery.from(entityClass);

  //   List<Predicate> predicates = new ArrayList<>();
  //   for (Map.Entry<String, String> filterItem : filter.getFilters().entrySet()) {
  //     String value = String.format(QueryConstants.LIKE, (filterItem.getValue() != null) ? filterItem.getValue().toLowerCase(): "");
  //     Predicate predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get(filterItem.getKey())), value);
  //     predicates.add(predicate);
  //   }
  
  //   createQuery.where(predicates.toArray(Predicate[]::new));

  //   List<Path<E>> paths = new ArrayList<>();
  //   for (String projectionField : filter.getProjectionFields()) {
  //     paths.add(root.get(projectionField.split("\\.")[0]));
  //   }
  //   createQuery.multiselect(paths.toArray(Path[]::new));

  //   // TypedQuery<E> query = entityManager.createQuery(createQuery);
  //   TypedQuery<Tuple> query = entityManager
  //     .createQuery(createQuery)
  //     .setMaxResults(filter.getPageSize())
  //     .setFirstResult(filter.getPageSize() * filter.getPageFrom());

  //   ModelMapper modelMapper = new ModelMapper();
  //   List<E> list = query.getResultList().stream().map((Tuple tuple) -> { 
  //     Map<String, Object> maps = new HashMap<>();

  //     Short tupleIndex = 0;
  //     for (String projectionField : filter.getProjectionFields()) {
  //       maps.put(projectionField, tuple.get(tupleIndex++));
  //     }
  //     return modelMapper.map(maps, entityClass);
  //   } ).collect(Collectors.toList());

  //   return list;
  // }

  private <R> Root<E> applySpecificationsToCriteria(CriteriaQuery<R> query, CriteriaBuilder builder, Specification<E> specs, Class<E> entityClass) {
    Assert.notNull(query, "CriteriaQuery must not be null!");

    Root<E> root = query.from(entityClass);

    if (specs == null) {
      return root;
    }

    Predicate predicate = specs.toPredicate(root, query, builder);

    if (predicate != null) {
      query.where(predicate);
    }

    return root;
  }

  private List<Selection<?>> getSelections(List<String> fields, Root<E> root) {
    List<Selection<?>> selections = new ArrayList<>();

    for (String field : fields) {
      String rawField = field.split("\\.")[0];
      selections.add(root.get(rawField).alias(rawField));
    }

    return selections;
  }

  private <R> void applySorting(CriteriaBuilder builder, CriteriaQuery<R> query, Root<E> root, Pageable pageable) {
    Sort sort = pageable.isPaged() ? pageable.getSort() : Sort.unsorted();
    if (sort.isSorted()) {
//      query.orderBy(toOrders(sort, root, builder));
    }
  }

  private <R> List<R> getPageableResultList(CriteriaQuery<R> query, Pageable pageable) {
    TypedQuery<R> typedQuery = entityManager.createQuery(query);

    // Apply pagination
    if (pageable.isPaged()) {
      typedQuery.setFirstResult((int) pageable.getOffset());
      typedQuery.setMaxResults(pageable.getPageSize());
    }

    return typedQuery.getResultList();
  }

  public List<E> findByFiltersWithPagination(Specification<E> specs, FilterModel filter, Class<E> entityClass) {
    Pageable pageable = filter.getPageable();
    Assert.notNull(pageable, "Pageable must be not null!");
    Assert.notEmpty(filter.getProjectionFields(), "Fields must not be empty!");

    // Create query
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    // CriteriaQuery<E> query = builder.createQuery(entityClass);
    CriteriaQuery<Tuple> query = builder.createTupleQuery();
    // Define FROM clause
    Root<E> root = applySpecificationsToCriteria(query, builder, specs, entityClass);
    // Define selecting expression
    List<Selection<?>> selections = getSelections(filter.getProjectionFields(), root);
    query.multiselect(selections);
    //Define ORDER BY clause
    applySorting(builder, query, root, pageable);

    ModelMapper modelMapper = new ModelMapper();
    return getPageableResultList(query, pageable).stream().map((Tuple tuple) -> { 
      Map<String, Object> maps = new HashMap<>();
      tuple.getElements().forEach(tupleElement -> {
        maps.put(tupleElement.getAlias(), tuple.get(tupleElement.getAlias()));
      });
      return modelMapper.map(maps, entityClass);
    } ).collect(Collectors.toList());
  }

  public long countByFiltersWithPagination(Specification<E> specs, Class<E> entityClass) {
    // Create query
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Long> queryCount = builder.createQuery(Long.class);
    // Define FROM clause
    Root<E> rootCount = applySpecificationsToCriteria(queryCount, builder, specs, entityClass);

    queryCount.select(builder.count(rootCount));
    return entityManager.createQuery(queryCount).getSingleResult();
  }
 
  public Specification<E> buildSpecificationsByFilters(FilterModel filter) {
    GenericSpecificationsBuilder<E> builder = new GenericSpecificationsBuilder<>();

    for (Map.Entry<String, FilterModel.Filter> filterItem : filter.getFilters().entrySet()) {
      switch(filterItem.getValue().getType()) {
        case TEXT:
          builder.with(specificationFactory.isLike(filterItem.getKey(), filterItem.getValue().getValue()));
          break;
        case NUMBER:
        case ENUM:
          builder.with(specificationFactory.isEqual(filterItem.getKey(), filterItem.getValue().getValue()));
          break;
      }
    }

    Specification<E> spec = builder.build();
    return spec;
  }

  public List<E> findByFilters(FilterModel filter, Class<E> entityClass) {
    return findByFiltersWithPagination(buildSpecificationsByFilters(filter), filter, entityClass);
  }
  
  public long countByFilters(FilterModel filter, Class<E> entityClass) {
    return countByFiltersWithPagination(buildSpecificationsByFilters(filter), entityClass);
  }
}
