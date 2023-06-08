import axios from 'axios';
import IAuthzRepository from './IAuthzRepository';
import KeycloakAxiosRepository from './KeycloakAxiosRepository';
import ResourceUpdatePayload from './Payload/ResourceUpdatePayload';
import ResourceResponse from './Responses/ResourceResponse';
import ResourceRepPayload from './Payload/ResourceRepPayload';
import PermissionResponse from './Responses/PermissionResponse';
import PermissionUpdatePayload from './Payload/PermissionUpdatePayload';
import PermissionRepPayload from './Payload/PermissionRepPayload';
import PolicyResponse from './Responses/PolicyResponse';
import PolicyRepPayload from './Payload/PolicyRepPayload';
import ScopeResponse from './Payload/ScopeRepPayload';
import ScopePayload from './Payload/ScopePayload';

class AuthzKeycloakRepository extends KeycloakAxiosRepository implements IAuthzRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/admin/realms/${this.mainRealm}`;
    }

    public async createResource(payload: ResourceRepPayload): Promise<ResourceResponse>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            name: payload.name,
            displayName: payload.name,
            type: payload.name,
            icon_uri:'',
            scopes: payload.scopes,
            ownerManagedAccess: payload.ownerManagedAccess,
            uris: payload.uris,
            attributes: {}
        };

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/resource`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        return (await axios(config)).data;
    }

    public async updateResource(payload: ResourceUpdatePayload): Promise<ResourceResponse>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/resource/${payload.id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async listResources(): Promise<ResourceResponse[]>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/resource`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await axios(config)).data;
    }

    async createScopes(data: ScopePayload): Promise<ScopeResponse>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/scope`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        return (await axios(config)).data;
    }

    async listScopes(): Promise<ScopeResponse[]>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/scope`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await axios(config)).data;
    }

    async createPolicy(payload: PolicyRepPayload): Promise<PolicyResponse>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/policy/role`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async listPolicies(): Promise<PolicyResponse[]>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/policy/role`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await axios(config)).data;
    }

    async createPermission(payload: PermissionRepPayload): Promise<PermissionResponse>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/scope`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async updatePermission(payload: PermissionUpdatePayload): Promise<PermissionResponse>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/scope/${payload.id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async listPermissions(): Promise<PermissionResponse[]>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/scope`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await axios(config)).data;
    }

    async removeAllPermissions(): Promise<void>
    {
        const loginRes = await this.loginAdmin();
        const permissions = await this.listPermissions();
        const actionPermissionsToDelete = [];

        for (const permission of permissions)
        {
            const config = {
                ...this.config,
                method: 'delete',
                url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/scope/${permission.id}`,
                headers: {
                    'Authorization': `Bearer ${loginRes.access_token}`,
                    'Content-Type': 'application/json'
                }
            };

            actionPermissionsToDelete.push(axios(config));
        }

        await Promise.all(actionPermissionsToDelete);
    }
}

export default AuthzKeycloakRepository;
