export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './book.service';
import { BookService } from './book.service';
export * from './feedback.service';
import { FeedbackService } from './feedback.service';
export const APIS = [AuthenticationService, BookService, FeedbackService];
