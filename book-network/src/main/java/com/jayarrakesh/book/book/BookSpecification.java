package com.jayarrakesh.book.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Book> withOwnerId(String userId) {
        return (root, query, cb) -> cb.equal(root.get("createdBy"), userId);
    }
}
