import ResourceResponse from '../Infrastructure/Repositories/Auth/Responses/ResourceResponse';
import ResourceRepPayload from '../Infrastructure/Repositories/Auth/Payload/ResourceRepPayload';
import ResourceUpdatePayload from '../Infrastructure/Repositories/Auth/Payload/ResourceUpdatePayload';
import PolicyRepPayload from '../Infrastructure/Repositories/Auth/Payload/PolicyRepPayload';
import PolicyResponse from '../Infrastructure/Repositories/Auth/Responses/PolicyResponse';
import ScopePayload from '../Infrastructure/Repositories/Auth/Payload/ScopePayload';
import ScopeResponse from '../Infrastructure/Repositories/Auth/Payload/ScopeRepPayload';
import PermissionResponse from '../Infrastructure/Repositories/Auth/Responses/PermissionResponse';
import PermissionRepPayload from '../Infrastructure/Repositories/Auth/Payload/PermissionRepPayload';
import PermissionUpdatePayload from '../Infrastructure/Repositories/Auth/Payload/PermissionUpdatePayload';

const responseResourceResponse: ResourceResponse = {
    _id: '',
    attributes: undefined,
    displayName: '',
    icon_uri: '',
    name: '',
    owner: { id: '', name: '' },
    ownerManagedAccess: false,
    scopes: [],
    type: '',
    uris: []
};

const responsePolicyResponse: PolicyResponse = {
    decisionStrategy: '',
    description: '',
    id: '',
    logic: '',
    name: '',
    type: ''
};

const responseScopeResponse: ScopeResponse = { iconUri: '', id: '', name: '' };

const responsePermissionResponse: PermissionResponse = {
    decisionStrategy: '',
    description: '',
    id: '',
    logic: '',
    name: '',
    type: ''
};

class AuthzMockRepository
{
    async createResource(payload: ResourceRepPayload): Promise<ResourceResponse>
    {
        return new Promise<ResourceResponse>((resolve) => resolve(responseResourceResponse));
    }

    async updateResource(payload: ResourceUpdatePayload): Promise<ResourceResponse>
    {
        return new Promise<ResourceResponse>((resolve) => resolve(responseResourceResponse));
    }

    async listResources(): Promise<ResourceResponse[]>
    {
        return new Promise<ResourceResponse[]>((resolve) => resolve([responseResourceResponse]));
    }

    async createPolicy(payload: PolicyRepPayload): Promise<PolicyResponse>
    {
        return new Promise<PolicyResponse>((resolve) => resolve(responsePolicyResponse));
    }

    async listPolicies(): Promise<PolicyResponse[]>
    {
        return new Promise<PolicyResponse[]>((resolve) => resolve([responsePolicyResponse]));
    }

    async createScopes(payload: ScopePayload): Promise<ScopeResponse>
    {
        return new Promise<ScopeResponse>((resolve) => resolve(responseScopeResponse));
    }

    async listScopes(): Promise<ScopeResponse[]>
    {
        return new Promise<ScopeResponse[]>((resolve) => resolve([responseScopeResponse]));
    }

    async createPermission(payload: PermissionRepPayload): Promise<PermissionResponse>
    {
        return new Promise<PermissionResponse>((resolve) => resolve(responsePermissionResponse));
    }

    async updatePermission(payload: PermissionUpdatePayload): Promise<PermissionResponse>
    {
        return new Promise<PermissionResponse>((resolve) => resolve(responsePermissionResponse));
    }

    async listPermissions(): Promise<PermissionResponse[]>
    {
        return new Promise<PermissionResponse[]>((resolve) => resolve([responsePermissionResponse]));
    }

    async removeAllPermissions(): Promise<void>
    {
        return;
    }
}

export default AuthzMockRepository;
