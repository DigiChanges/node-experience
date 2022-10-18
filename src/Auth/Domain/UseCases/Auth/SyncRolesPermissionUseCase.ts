import _ from 'lodash';

import Permissions from '../../../../Config/Permissions';
import Roles from '../../../../Config/Roles';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/IRoleRepository';
import Role from '../../../Domain/Entities/Role';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class SyncRolesPermissionUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(): Promise<string[]>
    {
        const roles = Roles.getRoles();

        for (const key in roles)
        {
            let permissions = roles[key];
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
                const payload = {
                    name: key,
                    slug: key.toLowerCase(),
                    permissions,
                    enable: true,
                    ofSystem: true
                };

                const newRole: IRoleDomain = new Role(payload);
                await this.repository.save(newRole);
            }
        }

        return _.flatMap(Permissions.permissions());
    }
}

export default SyncRolesPermissionUseCase;
