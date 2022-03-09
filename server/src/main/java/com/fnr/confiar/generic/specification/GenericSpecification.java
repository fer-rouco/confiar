package com.fnr.confiar.generic.specification;

import java.util.List;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GenericSpecification<T> implements Specification<T> {
   
   private SearchCriteria searchCriteria;
   
   public GenericSpecification(final SearchCriteria searchCriteria) {
      super();
      this.searchCriteria = searchCriteria;
   }
   
   private Path<T> getPath(Root<T> root, String attributeName) {
      Path<T> path = root;
      for (String attributeNamePart : attributeName.split("\\.")) {
         path = path.get(attributeNamePart);
      }
      return path;
  }

   @Override
   public Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
      Predicate predicate = null;
      List<Object> arguments = searchCriteria.getArguments();
      Object arg = arguments.get(0);
      Path<T> path = getPath(root, searchCriteria.getKey());

      switch (searchCriteria.getSearchOperation()) {
         case EQUALS:
            predicate = criteriaBuilder.equal(path, castToRequiredType(path.getJavaType(), String.valueOf(arg)));
            break;
         case NOT_EQUALS:
            predicate = criteriaBuilder.equal(path, castToRequiredType(path.getJavaType(), String.valueOf(arg)));
            break;
         case LIKE:
            String value = String.format(QueryConstants.LIKE, (arg != null) ? String.valueOf(arg).toLowerCase(): "");
            predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCriteria.getKey())), value);
            // predicate = criteriaBuilder.like(root.get(searchCriteria.getKey()), "%"+arg+"%");
            break;
         case GREATER_THAN:
            predicate = criteriaBuilder.gt(root.get(searchCriteria.getKey()), (Number) castToRequiredType(path.getJavaType(), String.valueOf(arg)));
            // predicate = criteriaBuilder.greaterThan(root.get(searchCriteria.getKey()), (Comparable) arg);
            break;
         case LESS_THAN:
            predicate = criteriaBuilder.lt(root.get(searchCriteria.getKey()), (Number) castToRequiredType(path.getJavaType(), String.valueOf(arg)));
            break;
         case IN:
            predicate = path.in(arguments);
            break;
         case STARTS_WITH:
            break;
         case ENDS_WITH:
            break;
      }

      return predicate;
   }

   @SuppressWarnings("unchecked")
   private <O extends Object> Object castToRequiredType(Class<O> fieldType, String value) {
      if (fieldType.isAssignableFrom(String.class)) {
         return String.valueOf(value);
      } else if (fieldType.isAssignableFrom(Byte.class)) {
         return Byte.valueOf(value);
      } else if (fieldType.isAssignableFrom(Short.class)) {
         return Short.valueOf(value);
      } else if (fieldType.isAssignableFrom(Integer.class)) {
        return Integer.valueOf(value);
      } else if (fieldType.isAssignableFrom(Long.class)) {
         return Long.valueOf(value);
      } else if (fieldType.isAssignableFrom(Double.class)) {
        return Double.valueOf(value);
      } else if (fieldType.isAssignableFrom(Float.class)) {
         return Float.valueOf(value);
      } else if (fieldType.isAssignableFrom(Enum.class)) {
        return Enum.valueOf((Class<Enum>) fieldType, value);
      }
      return null;
    }
    
   //  private <O extends Object> Object castToRequiredType(Class<O> fieldType, List<String> value) {
   //    List<Object> lists = new ArrayList<>();
   //    for (String s : value) {
   //      lists.add(castToRequiredType(fieldType, s));
   //    }
   //    return lists;
   //  }

}
