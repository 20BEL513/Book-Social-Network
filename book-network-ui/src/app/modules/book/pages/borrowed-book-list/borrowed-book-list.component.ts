import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse, BookService, FeedbackRequest, FeedbackService } from 'app/services';

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss']
})
export class BorrowedBookListComponent implements OnInit {

  page = 0;
  size = 5;
  pages: any = [];
  borrowedBooks: PageResponseBorrowedBookResponse = {
    content: [],
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true
  };
  selectedBook: BorrowedBookResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService  
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks() {
  this.bookService.findAllBorrowedBooks(this.page, this.size).subscribe({
  next: async (resp: any) => {
    if (resp instanceof Blob) {
      const text = await resp.text();
      const json = JSON.parse(text);
      this.borrowedBooks = json;
    } else {
      this.borrowedBooks = resp;
    }
    this.pages = Array(this.borrowedBooks.totalPages).fill(0).map((x, i) => i);
  }
});

}

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === this.borrowedBooks.totalPages as number - 1;
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook(
      this.selectedBook?.id as number
    ).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }
  giveFeedback() {
    this.feedbackService.saveFeedback(
      this.feedbackRequest
    ).subscribe({
      next: () => {
      }
    });
  }

  // returnBorrowedBook(book: BorrowedBookResponse): void {
  // if (book.id == null) {
  //   console.error('Book ID is undefined, cannot return book.');
  //   return;
  // }

  // this.bookService.returnBorrowBook(book.id).subscribe({
  //   next: () => {
  //     book.returned = true;
  //     console.log('Book returned successfully:', book.title);
  //   },
  //   error: (err) => console.error('Error returning book', err)
  // });

}
