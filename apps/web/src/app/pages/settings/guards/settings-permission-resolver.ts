import { ActivatedRouteSnapshot } from "@angular/router";
import { Actions, Subjects } from "@easy-bsb/web/core/permissions";

export function settingsPermissionsResolver(
  activatedRoute: ActivatedRouteSnapshot
): [Actions, Subjects] {
  const section = activatedRoute.params['section'];
  if (section === 'users') {
    return ['read', Subjects.User];
  }
  return ['read', Subjects.Devices];
}
