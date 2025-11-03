package com.jayarrakesh.book.feedback;

import com.jayarrakesh.book.book.Book;
import com.jayarrakesh.book.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feedback  extends BaseEntity {

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Double note;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

}
