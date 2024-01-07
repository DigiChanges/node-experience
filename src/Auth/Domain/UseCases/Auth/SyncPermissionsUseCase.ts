import Permissions from '../../../../Config/Permissions';
import Roles from '../../../../Config/Roles';
import DependencyInjector from '../../../../Shared/DI/DependencyInjector';
import IAuthRepository from '../../Repositories/IAuthRepository';
import IRoleDomain from '../../Entities/IRoleDomain';
import Logger from '../../../../Shared/Helpers/Logger';
import IPermissionDomain from '../../Entities/IPermissionDomain';
import { REPOSITORIES } from '../../../../Shared/DI/Injects';

class SyncPermissionsUseCase
{
    #repository: IAuthRepository;

    constructor()
    {
        this.#repository = DependencyInjector.inject<IAuthRepository>(REPOSITORIES.IAuthRepository);
    }

    async handle(): Promise<void>
    {
        const currentDomainPermissions: IPermissionDomain[] = await this.#repository.getPermissions();
        const currentPermissions: string[] = currentDomainPermissions.map((permission: IPermissionDomain) => permission.name);

        const permissions: string[] =  Permissions.permissions();
        const roles: Map<string, string[]> =  Roles.getRoles();

        await this.syncPermissions(currentPermissions, permissions);
        await this.addNewRoles(roles);
        await this.updateRolePermissions();
    }

    async syncPermissions(currentPermissions: string[], codePermissions: string[])
    {
        const newPermissions = codePermissions.filter(perm => !currentPermissions.includes(perm));
        const obsoletePermissions = currentPermissions.filter(perm => !codePermissions.includes(perm));

        await this.#repository.addPermissions(newPermissions);
        await this.#repository.removePermissions(obsoletePermissions);

        Logger.info('Sync permissions successfully.');
    }

    async addNewRoles(roles: Map<string, string[]>)
    {
        const currentRoles = await this.#repository.getRoles();
        const rolesToInsert: any[] = [];

        for (const [roleName, _] of roles)
        {
            if (!currentRoles.some((role: IRoleDomain) => role.name === roleName))
            {
                rolesToInsert.push({ name: roleName, slug: roleName.toLowerCase() });
            }
        }

        if (rolesToInsert.length > 0)
        {
            await this.#repository.addRoles(rolesToInsert);
        }

        Logger.info('Add new roles successfully.');
    }

    async updateRolePermissions()
    {
        const allRoles = await this.#repository.getRoles();
        const allPermissions = await this.#repository.getPermissions();

        const rolePermissionAssignments = [];

        for (const [roleName, permissions] of Roles.getRoles())
        {
            const role = allRoles.find(roleDomain => roleDomain.name === roleName);

            if (!role)
            {
                throw new Error(`Role ${roleName} not found.`);
            }

            const permissionMap = allPermissions.reduce((map, perm) =>
            {
                map[perm.name] = perm;
                return map;
            }, {});

            for (const permissionName of permissions)
            {
                const permission = permissionMap[permissionName];

                if (!permission)
                {
                    Logger.error('Permission not found.');
                    continue;
                }

                rolePermissionAssignments.push({ role_id: role.id, permission_id: permission.id });
            }
        }

        if (rolePermissionAssignments.length > 0)
        {
            await this.#repository.addRolesHasPermissions(rolePermissionAssignments);
        }

        Logger.error('Add or update permissions successfully.');
    }
}

export default SyncPermissionsUseCase;
