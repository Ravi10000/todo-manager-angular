import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, filter } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    filter(user => {
      console.log({ user });
      return user !== undefined
    }),
    map(user => {
      console.log({ user });
      if (!user) {
        router.navigate(["/login"]);
        return false;
      }
      return true;
    }))
};
