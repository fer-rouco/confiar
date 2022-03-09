package com.fnr.confiar.base.specification;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.*;
import java.util.IllegalFormatException;

/**
 * <p>
 * Class which implements {@link org.springframework.data.jpa.domain.Specification} interface
 * to generate {@link javax.persistence.criteria.Predicate} object
 * by checking given {@link com.kodgemisi.specification.FilterCriteria} object
 * </p>
 *
 * @param <T>
 * @param <C>
 */

@SuppressWarnings({"rawtypes", "unchecked"})
@AllArgsConstructor
class GenericSpecification<E, T, C extends Comparable<? super C>> implements Specification<E> {

	private final FilterCriteria<T> filterCriteria;

	@Override
	public Predicate toPredicate(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

		final CriteriaOperation operation = filterCriteria.getOperation();
		final String key = filterCriteria.getKey();

		switch (operation) {
		case JOIN: {
			final JoinType joinType = filterCriteria.getJoinType();
			root.join(key, joinType);
			return null;
		}

		case JOIN_FETCH: {
			final Class clazz = query.getResultType();
			final JoinType joinType = filterCriteria.getJoinType();
			if (clazz.equals(Long.class) || clazz.equals(long.class)) {
				// If clazz is long then it's a count query for pageable
				root.join(key, joinType);
				return null;
			}
			else {
				root.fetch(key, joinType);
				query.distinct(true);
				return null;
			}
		}
		case EQUAL: {
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.equal(path, filterCriteria.getValue());
		}
		case IS_NULL: {
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.isNull(path);
		}
		case IS_NOT_NULL: {
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.isNotNull(path);
		}
		case LIKE: {
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			if (filterCriteria.isCaseSensitive()) {
				String value = String.format(QueryConstants.LIKE, (filterCriteria.getValue() != null) ? String.valueOf(filterCriteria.getValue()): "");
				criteriaBuilder.like(path.as(String.class), value);
			}
			else {
				String value = String.format(QueryConstants.LIKE, (filterCriteria.getValue() != null) ? String.valueOf(filterCriteria.getValue()).toLowerCase(): "");
				return criteriaBuilder.like(criteriaBuilder.lower(path.as(String.class)), value);
			}
		}

		case IN: {
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return path.in(filterCriteria.getValue());
		}

		case GREATER_THAN: {
			final ComparableFilterCriteria<C> comparableFilterCriteria = getComparableFilterCriteria();
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.greaterThan(path.as(comparableFilterCriteria.getClazz()), comparableFilterCriteria.getValue());
		}

		case GREATER_THAN_OR_EQUAL_TO: {
			final ComparableFilterCriteria<C> comparableFilterCriteria = getComparableFilterCriteria();
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.greaterThanOrEqualTo(path.as(comparableFilterCriteria.getClazz()), comparableFilterCriteria.getValue());
		}

		case LESS_THAN: {
			final ComparableFilterCriteria<C> comparableFilterCriteria = getComparableFilterCriteria();
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.lessThan(path.as(comparableFilterCriteria.getClazz()), comparableFilterCriteria.getValue());
		}

		case LESS_THAN_OR_EQUAL_TO: {
			final ComparableFilterCriteria<C> comparableFilterCriteria = getComparableFilterCriteria();
			final Path<?> path = resolvePath(root, filterCriteria.getKey());
			return criteriaBuilder.lessThanOrEqualTo(path.as(comparableFilterCriteria.getClazz()), comparableFilterCriteria.getValue());
		}

		default:
			return null;
		}
	}

	private ComparableFilterCriteria<C> getComparableFilterCriteria() {
		if(this.filterCriteria instanceof ComparableFilterCriteria) {
			return (ComparableFilterCriteria) filterCriteria;
		}
		throw new ClassCastException("TODO"); //TODO
	}

	private Path<?> resolvePath(Root<E> root, String key) throws IllegalFormatException {
		final String columns[] = key.split("\\.");

		if (columns.length == 1) {
			return root.get(key);
		}
		// throw exception if columns less than or equal to 1
		final Join<T, ?> joinedTable = root.join(columns[0], JoinType.LEFT);
		Path<Object> path = joinedTable.get(columns[1]);
		for (int i = 2; i < columns.length; i++) {
			path = path.get(columns[i]);
		}
		return path;
	}

}