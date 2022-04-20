import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { ILoginResponse, Role } from '@shitpost-generator/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRole: Role = route?.data['role'];

    if (!requiredRole) {
      // eslint-disable-next-line no-throw-literal
      throw `
        Roles array in the Route \`data\` property has to be provided for AuthGuard.
          Example:
          {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard],
            data: {
              roles: ['ROLE_ADMIN],
            },
          },
        `;
    }

    // check if the user is authorized to view the given page
    const accessInfo: ILoginResponse | null = this.authService.getAccessInfo();
    if (accessInfo === null) {
      return false;
    }
    const userRole: Role = accessInfo.role;
    const isAuthorized = userRole === requiredRole;
    if (!isAuthorized) {
      this.router.navigate(['/login']);
    }
    return isAuthorized;
  }
}
