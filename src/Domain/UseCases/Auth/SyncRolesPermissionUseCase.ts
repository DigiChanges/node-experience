import _ from "lodash";
import { lazyInject } from '../../../inversify.config'
import Permissions from "../../../../config/Permissions";
import Roles from "../../../../config/Roles";
import {REPOSITORIES} from "../../../repositories";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import Role from "../../Entities/Role";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class SyncRolesPermissionUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle()
    {
        const roles = Roles.getRoles();

        _.map(roles, async (value: string[], key: string) =>
        {
            let permissions = value;
            let amount = false;
            const role = await this.repository.getBySlug(key.toLowerCase());

            if (role)
            {
                amount = permissions.length >= role.permissions.length;
                permissions = amount ? _.union(role.permissions, permissions) : _.intersection(role.permissions, permissions);
                role.permissions = permissions;
                await this.repository.save(role);
            }
            else
            {
                const newRole: IRoleDomain = new Role();
                newRole.name = key;
                newRole.slug = key.toLowerCase();
                newRole.permissions = permissions;
                newRole.enable = true;

                await this.repository.save(newRole);
            }
        });

       return _.flatMap(Permissions.permissions());
    }
}

export default SyncRolesPermissionUseCase;
