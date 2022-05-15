import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability"
import { Injectable } from "@nestjs/common"

import { User, UserRoles } from "@app/users"
import { Actions } from "../constants/actions";
import { AppAbility, Subjects } from "../api";

@Injectable()
export class AbilityFactory {

  defineAbility(user: User): AppAbility {

    const { build, can, cannot } = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

    // should be role instead of userrole this is a bit duplicated
    switch (user.userrole) {
      case UserRoles.Admin:
        can(Actions.Manage, 'all')
        break

      // can not update users
      case UserRoles.Write:
        can(Actions.Update, 'all')
        can(Actions.Create, 'all')

        cannot(Actions.Update, User)
        cannot(Actions.Create, User)
        break

      case UserRoles.Read:
        can(Actions.Read, 'all')
        break
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
