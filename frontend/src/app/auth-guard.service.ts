import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { NbAuthService } from "@nebular/auth";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate() {
    // const user = this.authService.userValue;
    // if (user) {
    //     // check if route is restricted by role
    //     if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
    //         // role not authorised so redirect to home page
    //         this.router.navigate(['/']);
    //         return false;
    //     }

    //     // authorised so return true
    //     return true;
    // }

    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(["auth/login"]);
          localStorage.removeItem("Productos");
        } else {
        }
      })
    );
  }
}
