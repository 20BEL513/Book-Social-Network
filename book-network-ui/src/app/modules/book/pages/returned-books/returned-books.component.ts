import { Component, OnInit } from '@angular/core';
import { BookService, BorrowedBookResponse, PageResponseBorrowedBookResponse } from 'app/services';

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss']
})
export class ReturnedBooksComponent implements OnInit{
  level: string | undefined;
  message: string | undefined;
approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      this.level='error';
      this.message = 'This book is not yet returned'
      return;
    }
    this.bookService.approveReturnBorrowBook(
      book.id as number
    ).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllReturnedBooks();
      }
    });
}
  page = 0;
    size = 5;
    pages: any = [];
    returnedBooks: PageResponseBorrowedBookResponse = {
      content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true
    };
    selectedBook: BorrowedBookResponse | undefined = undefined;
      
    constructor(
      private bookService: BookService,
       
    ) {}
  
    ngOnInit(): void {
      this.findAllReturnedBooks();
    }
  
    private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks(this.page, this.size).subscribe({
    next: async (resp: any) => {
      if (resp instanceof Blob) {
        const text = await resp.text();
        const json = JSON.parse(text);
        this.returnedBooks = json;
      } else {
        this.returnedBooks = resp;
      }
      this.pages = Array(this.returnedBooks.totalPages).fill(0).map((x, i) => i);
    }
  });

  }
  
    gotToPage(page: number) {
      this.page = page;
      this.findAllReturnedBooks();
    }
  
    goToFirstPage() {
      this.page = 0;
      this.findAllReturnedBooks();
    }
  
    goToPreviousPage() {
      this.page --;
      this.findAllReturnedBooks();
    }
  
    goToLastPage() {
      this.page = this.returnedBooks.totalPages as number - 1;
      this.findAllReturnedBooks();
    }
  
    goToNextPage() {
      this.page++;
      this.findAllReturnedBooks();
    }
  
    get isLastPage() {
      return this.page === this.returnedBooks.totalPages as number - 1;
    }
  
    
  
   
}
