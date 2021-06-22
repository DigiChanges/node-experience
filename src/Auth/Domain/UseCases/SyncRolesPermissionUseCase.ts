import _ from 'lodash';

import Permissions from '../../../Config/Permissions';
import Roles from '../../../Config/Roles';
import {REPOSITORIES} from '../../../repositories';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import Role from '../../../Role/Domain/Entities/Role';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class SyncRolesPermissionUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    handle()
    {
        const roles = Roles.getRoles();

        _.map(roles, async(value: string[], key: string) =>
        {
            let permissions = value;
            let amount = false;
            const role = await this.repository.getBySlug(key.toLowerCase());

            if (role)
            {
                amount = permissions.length >= role.permissions.length;
                permissions = amount ? _.union(role.permissions, permissions) : _.intersection(role.permissions, permissions);
                role.permissions = permissions;
                role.ofSystem = true;
                await this.repository.save(role);
            }
            else
            {
                const newRole: IRoleDomain = new Role();

                newRole.name = key;
                newRole.slug = key.toLowerCase();
                newRole.permissions = permissions;
                newRole.enable = true;
                newRole.ofSystem = true;

                await this.repository.save(newRole);
            }
        });

        return _.flatMap(Permissions.permissions());
    }
}

export default SyncRolesPermissionUseCase;
