package com.fnr.confiar.repositories.specs;

import java.util.Collections;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class SpecificationFactory<T> {

    public Specification<T> isLike(String key, Object arg) {
      GenericSpecificationsBuilder<T> builder = new GenericSpecificationsBuilder<>();
      return builder.with(key, SearchOperation.LIKE, Collections.singletonList(arg)).build();
    }

    public Specification<T> isEqual(String key, Object arg) {
        GenericSpecificationsBuilder<T> builder = new GenericSpecificationsBuilder<>();
        return builder.with(key, SearchOperation.EQUALS, Collections.singletonList(arg)).build();
    }

    public Specification<T> isGreaterThan(String key, Comparable<Object> arg) {
        GenericSpecificationsBuilder<T> builder = new GenericSpecificationsBuilder<>();
        return builder.with(key, SearchOperation.GREATER_THAN, Collections.singletonList(arg)).build();
    }
}
