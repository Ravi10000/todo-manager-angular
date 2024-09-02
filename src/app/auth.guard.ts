import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.user) return true;
  return authService.fetchProfile().pipe(map(response => {
    console.log({ response });
    if(!response.user){
      router.navigate(['/login']);
      return false;
    }
    return true;
  }))
};
