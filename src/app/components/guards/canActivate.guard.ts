import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { CarStoreService } from "../../services/car-store.service";

export function getStepAllowedGuardFn(step: number): CanActivateFn {
  return (
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const storageService = inject(CarStoreService);
    const router = inject(Router);
    const isStep2Allowed = storageService.step2Active$.value;
    const isStep3Allowed = storageService.step3Active$.value;

    if ((step === 2 && !isStep2Allowed) || (step === 3 && !isStep3Allowed)) {
      return router.createUrlTree(['/model']);
    } else {
      return true;
    }
  }
}
