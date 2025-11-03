import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest, BookService } from 'app/services';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    title: '',
    authorName: '',
    isbn: '',
    sysnopsis: '',
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const bookIdParam = this.activatedRoute.snapshot.params['bookId'];
    const bookId = bookIdParam ? Number(bookIdParam) : undefined;

    if (bookId) {
      this.bookService.findBookById(bookId).subscribe({
        next: (book) => {
          this.bookRequest = {
            id: book.id,
            title: book.title || '',
            authorName: book.authorname || '',
            isbn: book.isbn || '',
            sysnopsis: book.sysnopsis || '',
            shareable: book.shareable
          };
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        },
        error: (err) => {
          console.error('Error loading book:', err);
        }
      });
    }
  }

  saveBook() {
  this.errorMsg = [];

  if (
    !this.bookRequest.title ||
    !this.bookRequest.authorName ||
    !this.bookRequest.isbn ||
    !this.bookRequest.sysnopsis
  ) {
    this.errorMsg = ['All fields are required'];
    return;
  }

  // Ensure book ID is a number or undefined
  const bookId = this.bookRequest.id != null ? Number(this.bookRequest.id) : undefined;
  if (bookId != null && isNaN(bookId)) {
    this.errorMsg = ['Invalid book ID'];
    return;
  }

  this.bookService.saveBook({ ...this.bookRequest, id: bookId }).subscribe({
    next: (response: any) => {
      // ✅ Handle Blob response from the generated service
      let savedBookId: number | null = null;

      if (response instanceof Blob) {
        // Convert Blob → text → number
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          savedBookId = Number(text);
          console.log('Book saved successfully, ID:', savedBookId);

          this.uploadCoverAndNavigate(savedBookId);
        };
        reader.readAsText(response);
      } else {
        // If backend already returns JSON/number
        savedBookId = Number(response?.id || response);
        console.log('Book saved successfully, ID:', savedBookId);
        this.uploadCoverAndNavigate(savedBookId);
      }
    },
    error: (err) => {
      console.error('Book save failed:', err);
      this.errorMsg = err.error?.validationErrors || ['Failed to save book'];
    }
  });
}

private uploadCoverAndNavigate(bookId: number) {
  if (!bookId || isNaN(bookId)) {
    this.errorMsg = ['Invalid book ID returned from server'];
    return;
  }

  if (this.selectedBookCover) {
    this.bookService.uploadBookCoverPicture(bookId, this.selectedBookCover).subscribe({
      next: () => {
        console.log('Cover uploaded successfully');
        this.router.navigate(['/books/my-books']);
      },
      error: (err) => {
        console.error('Cover upload failed:', err);
        this.errorMsg = ['Failed to upload book cover'];
      }
    });
  } else {
    this.router.navigate(['/books/my-books']);
  }
}



  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
