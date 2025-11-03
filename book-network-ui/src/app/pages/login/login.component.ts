import { TokenService } from './../../token/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/api/authentication.service';
import { AuthenticationResquest } from './../../services/model/authenticationResquest';
import { KeycloackService } from 'app/services/keycloack/keycloack.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  // authRequest: AuthenticationResquest = { email: '', password: '' };
  // errorMsg: string[] = [];

  constructor(
    private keycloackService: KeycloackService
  ) {}
  
  async ngOnInit(): Promise<void> {
    await this.keycloackService.init();
      await this.keycloackService.login();
  }

//   // Navigate to registration page
//   register() {
//     this.router.navigate(['register']);
//   }

//   // Login method
//   login() {
//   this.errorMsg = []; // clear previous errors

//   this.authService.authenticate(this.authRequest).subscribe({
//     next: (res: any) => {
//       // Handle Blob response
//       if (res instanceof Blob) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const json = JSON.parse(reader.result as string);
//           console.log('Parsed response:', json);

//           if (json.token) {
//             this.TokenService.token = json.token;
//             console.log('Token stored:', localStorage.getItem('token'));
//           }

//           // Check if 'books' route exists
//           this.router.navigate(['books']).catch(err => {
//             console.error('Routing error:', err);
//           });
//         };
//         reader.readAsText(res);
//       } else {
//         // Response is already JSON
//         if (res.token) {
//           this.TokenService.token = res.token;
//         }
//         this.router.navigate(['books']).catch(err => console.error(err));
//       }
//     },
//     error: (err) => {
//       console.error('Login failed:', err);

//       if (err.error) {
//         try {
//           if (err.error instanceof Blob) {
//             const reader = new FileReader();
//             reader.onload = () => {
//               const errorData = JSON.parse(reader.result as string);
//               this.setErrorMessages(errorData);
//             };
//             reader.readAsText(err.error);
//           } else {
//             this.setErrorMessages(err.error);
//           }
//         } catch {
//           this.errorMsg = ['An unknown error occurred'];
//         }
//       } else {
//         this.errorMsg = ['Invalid email or password'];
//       }
//     }
//   });
// }


//   // Helper to set errors
//   private setErrorMessages(errorData: any) {
//   if (errorData.validationErrors && Array.isArray(errorData.validationErrors)) {
//     this.errorMsg = errorData.validationErrors;
//   } else if (errorData.errorMsg) {
//     this.errorMsg = [errorData.errorMsg];
//   } else if (errorData.businessErrorDescription) {
//     this.errorMsg = [errorData.businessErrorDescription];
//   } else {
//     this.errorMsg = ['Invalid email or password'];
//   }
// }

}
