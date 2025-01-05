import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const Authservice: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  if (Authservice.isloggedin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
