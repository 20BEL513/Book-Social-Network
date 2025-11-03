import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloackService } from '../keycloack/keycloack.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloackService);
  const router = inject(Router);
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
