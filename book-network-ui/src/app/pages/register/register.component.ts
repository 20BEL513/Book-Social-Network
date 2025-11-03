import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/api/authentication.service';
import { RegistrationRequest } from './../../services/model/registrationRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {firstname: '', lastname: '',email: '', password: '' };
  errorMsg: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  // Navigate to login page
  login() {
    this.router.navigate(['login']);
  }

  // Register method
  register() {
    this.errorMsg = []; // clear previous errors

    this.authService.register(this.registerRequest).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['activate-account']); // navigate after success
      },
      error: (err) => {
        console.error('Registration failed:', err);

        if (err.error) {
          try {
            // If error is a Blob, parse it
            if (err.error instanceof Blob) {
              const reader = new FileReader();
              reader.onload = () => {
                const errorData = JSON.parse(reader.result as string);
                this.setErrorMessages(errorData);
              };
              reader.readAsText(err.error);
            } else {
              this.setErrorMessages(err.error);
            }
          } catch {
            this.errorMsg = ['An unknown error occurred'];
          }
        } else {
          this.errorMsg = ['Registration failed'];
        }
      }
    });
  }

  private setErrorMessages(errorData: any) {
    if (errorData.validationErrors && Array.isArray(errorData.validationErrors)) {
      this.errorMsg = errorData.validationErrors;
    } else if (errorData.businessErrorDescription) {
      this.errorMsg = [errorData.businessErrorDescription];
    } else {
      this.errorMsg = ['Registration failed'];
    }
  }
}
