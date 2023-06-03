import axios from 'axios';
import IAuthzRepository from './IAuthzRepository';
import KeycloakAxiosRepository from './KeycloakAxiosRepository';

class AuthzKeycloakRepository extends KeycloakAxiosRepository implements IAuthzRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/admin/realms/${this.mainRealm}`;
    }

    public async createResource(payload: any): Promise<any>
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

    public async updateResource(payload: any): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/resource/${payload._id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async listResources(): Promise<any>
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

    async createScopes(data: any): Promise<any>
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

    async listScopes(): Promise<any>
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

    async createPolicy(payload: any): Promise<any>
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

    async listPolicies(): Promise<any>
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

    async createPermission(payload: any): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/resource`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async updatePermission(payload: any): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/resource/${payload.id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        };

        return (await axios(config)).data;
    }

    async listPermissions(): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/resource`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await axios(config)).data;
    }

    async removeAllPermissions(): Promise<any>
    {
        const loginRes = await this.loginAdmin();
        const permissions = await this.listPermissions();
        const actionPermissionsToDelete = [];

        for (const permission of permissions)
        {
            const config = {
                ...this.config,
                method: 'delete',
                url: `${this.mainUrl}/clients/${this.clientUuid}/authz/resource-server/permission/resource/${permission.id}`,
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
