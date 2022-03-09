package com.fnr.confiar.generic.specification;

class ComparableFilterCriteria<T extends Comparable<? super T>> extends FilterCriteria<T> {

	ComparableFilterCriteria(String key, T value, CriteriaOperation operation, Class<T> clazz, ConditionType conditionType) {
		super(key, value, operation, clazz, conditionType);
	}
	
}