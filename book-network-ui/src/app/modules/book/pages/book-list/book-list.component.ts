import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../../../../services/api/book.service';
import { BookResponse } from './../../../../services/model/bookResponse';
import { PageResponseBookResponse } from 'app/services/model/pageResponseBookResponse'; // ✅ Ensure correct import path

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {


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
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks(): void {
  this.bookService.findAllBooks(
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

borrowBook(book: BookResponse): void {
  if (!book.id) {
    console.error('Invalid book: missing ID');
    this.message = 'Invalid book selection';
    this.level = 'error';
    return;
  }

  this.bookService.borrowBook(book.id).subscribe({
    next: () => {
      // Backend returns nothing — handle success manually
      this.message = 'Book successfully added to your list.';
      this.level = 'success';
      console.log(`Book borrowed successfully (ID: ${book.id})`);

      // ✅ Optional: refresh the book list after borrowing
      this.findAllBooks();
    },
    error: (err) => {
      // Handle API error
      console.error('Error borrowing book:', err);
      this.message = 'The requested book is already borrowed';
      this.level = 'error';
    }
  });
}





}

