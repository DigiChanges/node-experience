import Permissions from '../../../../Config/Permissions';
import Roles from '../../../../Config/Roles';
import container from '../../../../register';
import IAuthzRepository from '../../../Infrastructure/Repositories/Auth/IAuthzRepository';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import { REPOSITORIES } from '../../../../Config/Injects';
import Role from '../../Entities/Role';
import ScopePayload from '../../../Infrastructure/Repositories/Auth/Payload/ScopePayload';
import ResourceUpdatePayload from '../../../Infrastructure/Repositories/Auth/Payload/ResourceUpdatePayload';

class SyncPermissionsUseCase
{
    private repository: IAuthzRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        this.repository = container.resolve<IAuthzRepository>(REPOSITORIES.IAuthzRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(): Promise<void>
    {
        const permissions: string[] =  Permissions.permissions();
        const roles: Map<string, string[]> =  Roles.getRoles();

        const groupedPermissions: Record<string, string[]> = this.getResourceScopesList(permissions);
        const permissionsUrisList: Record<string, string> = this.getResourceUrisList(permissions);

        await this.createRoles(roles);
        await this.createScopes(permissions);
        await this.createResources(groupedPermissions, permissionsUrisList);
        await this.createPolicies(roles);
        await this.createPermissions(roles, permissions);
    }

    getResourceScopesList(permissions: string[]): Record<string, string[]>
    {
        const resourceScopes: Record<string, Set<string>> = {};

        for (const permission of permissions)
        {
            const [resource, scope] = permission.split('#');

            if (!resource || !scope)
            {
                continue;
            }

            const scopes = resourceScopes[resource] || new Set<string>();
            scopes.add(scope);
            resourceScopes[resource] = scopes;
        }

        const resourceScopesList: Record<string, string[]> = {};

        for (const resource in resourceScopes)
        {
            resourceScopesList[resource] = [...resourceScopes[resource]];
        }

        return resourceScopesList;
    }

    getResourceUrisList(permissions: string[]): Record<string, string>
    {
        const resourceUris: Record<string, string> = {};

        for (const permission of permissions)
        {
            const [resource] = permission.split('#');
            if (!resource)
            {
                continue;
            }
            if (!resourceUris[resource])
            {
                resourceUris[resource] = `/api/${resource.split(':')[1]}`;
            }
        }

        return resourceUris;
    }

    async createRoles(roles: Map<string, string[]>)
    {
        for await (const slugRole of roles)
        {
            const name = slugRole[0];
            const payload = {
                name,
                permissions: []
            };
            const role = new Role(payload);
            const rolesEntity = await this.roleRepository.getAll();
            const findUser = rolesEntity.find(roleEntity => roleEntity.name === name);

            if (!findUser)
            {
                await this.roleRepository.save(role);
            }
        }
    }

    async createScopes(permissions: string[])
    {
        const scopes = permissions.map(permission => permission.split('#')[1]);

        for await (const name of scopes)
        {
            const payload: ScopePayload = {
                name,
                displayName: name,
                iconUri: ''
            };

            await this.repository.createScopes(payload);
        }
    }

    async createResources(groupedPermissions: Record<string, string[]>, permissionsUrisList: Record<string, string>)
    {
        const resources: any[] = await this.repository.listResources();

        for (const resourceName in groupedPermissions)
        {
            // Verified if resource exists to avoid error on creation
            const resourceObject = resources.find(resource => resourceName === resource.name);

            const scopesObjects = await this.repository.listScopes();
            const scopesName = groupedPermissions[resourceName];
            const scopesFilter = scopesObjects.filter(scope => scopesName.includes(scope.name));

            if (!resourceObject)
            {
                const resourceUri = permissionsUrisList[resourceName];

                const payload = {
                    name: resourceName,
                    scopes: scopesFilter,
                    ownerManagedAccess: true,
                    uris: [resourceUri]
                };

                await this.repository.createResource(payload);
            }
            else
            {
                const payload: ResourceUpdatePayload = {
                    id: resourceObject._id,
                    name: resourceObject.name,
                    displayName: resourceObject.displayName,
                    type: resourceObject.type,
                    scopes: scopesFilter,
                    ownerManagedAccess: true,
                    uris: resourceObject.uris,
                    icon_uri: resourceObject.icon_uri,
                    attributes: resourceObject.attributes
                };

                await this.repository.updateResource(payload);
            }
        }
    }

    async createPolicies(roles: Map<string, string[]>)
    {
        const rolesKey = roles.keys();
        const objectRoles = await this.roleRepository.getAll();
        const policies = await this.repository.listPolicies();

        for await (const key of rolesKey)
        {
            const role = objectRoles.find(objectRole => objectRole.name === key);
            const _policy = policies.find(policy => policy.name.includes(key.toLowerCase()));

            if (role && !_policy)
            {
                const name = role.name.toLowerCase();

                const payload = {
                    description: `${name}:policy`,
                    logic: 'POSITIVE',
                    name: `${name}:policy`,
                    roles: [
                        {
                            id: role.getId(),
                            required: false
                        }
                    ]
                };

                await this.repository.createPolicy(payload);
            }
        }
    }

    async createPermissions(roles: Map<string, string[]>, permissions: string[])
    {
        await this.repository.removeAllPermissions();
        const resourcesList = await this.repository.listResources();
        const policies = await this.repository.listPolicies();
        const scopes = await this.repository.listScopes();

        for await (const permission of permissions)
        {
            const resourceName = permission.split('#')[0];
            const scopeName = permission.split('#')[1];
            const resource = resourcesList.find(resourceObject => resourceObject.name === resourceName);

            const rolesName: string[] = [...roles.keys()];
            const rolesPermissions = rolesName.map(name => ({ permissions: roles.get(name), name: name.toLowerCase() }));
            const policiesId: string[] = [];

            rolesPermissions.forEach(obj =>
            {
                if (obj.permissions.includes(permission))
                {
                    const policy = policies.find(p => p.name === `${obj.name}:policy`);
                    if (policy)
                    {
                        policiesId.push(policy.id);
                    }
                }
            });

            const scopesId: string[] = [];
            scopes.reduce((acc, scope) => scope.name === scopeName ? scopesId.push(scope.id) : acc, []);

            const payload = {
                resources: [
                    resource._id
                ],
                policies: policiesId,
                name: permission,
                description: permission,
                scopes: scopesId,
                decisionStrategy: 'AFFIRMATIVE'
            };

            await this.repository.createPermission(payload);
        }
    }
}

export default SyncPermissionsUseCase;
