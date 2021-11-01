package com.fnr.confiar.repositories.specs;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.fnr.confiar.services.QueryConstants;

import org.springframework.data.jpa.domain.Specification;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GenericSpecification<T> implements Specification<T> {
   
   private SearchCriteria searchCriteria;
   
   public GenericSpecification(final SearchCriteria searchCriteria) {
      super();
      this.searchCriteria = searchCriteria;
   }
   
   @Override
   public Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
      Predicate predicate = null;
      List<Object> arguments = searchCriteria.getArguments();
      Object arg = arguments.get(0);

      switch (searchCriteria.getSearchOperation()) {
         case EQUALS:
            predicate = criteriaBuilder.equal(root.get(searchCriteria.getKey()), arg);
            break;
         case NOT_EQUALS:
            predicate = criteriaBuilder.equal(root.get(searchCriteria.getKey()), arg);
            break;
         case LIKE:
            String value = String.format(QueryConstants.LIKE, (arg != null) ? String.valueOf(arg).toLowerCase(): "");
            predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getKey())), value);
            // predicate = criteriaBuilder.like(root.get(searchCriteria.getKey()), "%"+arg+"%");
            break;
         case GREATER_THAN:
            predicate = criteriaBuilder.gt(root.get(searchCriteria.getKey()), (Number) castToRequiredType(root.get(searchCriteria.getKey()).getJavaType(), String.valueOf(arg)));
            // predicate = criteriaBuilder.greaterThan(root.get(searchCriteria.getKey()), (Comparable) arg);
            break;
         case LESS_THAN:
            predicate = criteriaBuilder.lt(root.get(searchCriteria.getKey()), (Number) castToRequiredType(root.get(searchCriteria.getKey()).getJavaType(), String.valueOf(arg)));
            break;
         case IN:
            predicate = root.get(searchCriteria.getKey()).in(arguments);
            break;
         case STARTS_WITH:
            break;
         case ENDS_WITH:
            break;
      }

      return predicate;
   }

   private <O extends Object> Object castToRequiredType(Class<O> fieldType, String value) {
      if(fieldType.isAssignableFrom(Double.class)) {
        return Double.valueOf(value);
      } else if(fieldType.isAssignableFrom(Integer.class)) {
        return Integer.valueOf(value);
      } else if(Enum.class.isAssignableFrom(fieldType)) {
        return Enum.valueOf((Class) fieldType, value);
      }
      return null;
    }
    
    private <O extends Object> Object castToRequiredType(Class<O> fieldType, List<String> value) {
      List<Object> lists = new ArrayList<>();
      for (String s : value) {
        lists.add(castToRequiredType(fieldType, s));
      }
      return lists;
    }

}
