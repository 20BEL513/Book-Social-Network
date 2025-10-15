package com.jayarrakesh.book.book;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {

    private Integer id;
    private String title;
    private String authorname;
    private String isbn;
    private double rate;
    private boolean returned;
    private boolean returnApproved;
}
