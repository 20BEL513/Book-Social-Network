import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookResponse, BookService, PageResponseBookResponse } from 'app/services';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
editBook($event: BookResponse) {
throw new Error('Method not implemented.');
}
shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus(
       book.id as number
    ).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus(
      book.id as number
    ).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }


goToLastPage() {
  this.page=this.bookResponse.totalPages as number - 1;
  this.findAllBooks();
}
goToNextPage() {
  this.page++;
  this.findAllBooks();
}
goToPage(page: number) {
  this.page=page;
  this.findAllBooks();
}
goToFirstPage() {
  this.page=0;
  this.findAllBooks();
}
goToPreviousPage() {
  this.page--;
  this.findAllBooks();
}
get isLastPage(): boolean{
  return this.page == this.bookResponse.totalPages as number - 1;
}

  bookResponse: PageResponseBookResponse = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0
  };

  page = 0;
  size = 5;
  pages: number[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks(): void {
  this.bookService.findAllBooksByOwner(
    this.page, 
    this.size, 
    'body' as any,          // observe
    false,           // reportProgress
    { httpHeaderAccept: 'application/json' as any} // force JSON parsing
  ).subscribe({
    next: (books: PageResponseBookResponse) => {
      console.log('Books:', books);
      this.bookResponse = books;
    },
    error: (err) => console.error('Error fetching books:', err)
  });

  }
}
