import ResourceRepPayload from './Payload/ResourceRepPayload';
import ResourceUpdatePayload from './Payload/ResourceUpdatePayload';
import ResourceResponse from './Responses/ResourceResponse';
import PolicyRepPayload from './Payload/PolicyRepPayload';
import PolicyResponse from './Responses/PolicyResponse';
import ScopeResponse from './Payload/ScopeRepPayload';
import PermissionRepPayload from './Payload/PermissionRepPayload';
import PermissionResponse from './Responses/PermissionResponse';
import PermissionUpdatePayload from './Payload/PermissionUpdatePayload';
import ScopePayload from './Payload/ScopePayload';

interface IAuthzRepository
{
    createResource(payload: ResourceRepPayload): Promise<ResourceResponse>;
    updateResource(payload: ResourceUpdatePayload): Promise<ResourceResponse>;
    listResources(): Promise<ResourceResponse[]>;
    createPolicy(payload: PolicyRepPayload): Promise<PolicyResponse>;
    listPolicies(): Promise<PolicyResponse[]>;
    createScopes(payload: ScopePayload): Promise<ScopeResponse>;
    listScopes(): Promise<ScopeResponse[]>;
    createPermission(payload: PermissionRepPayload): Promise<PermissionResponse>;
    updatePermission(payload: PermissionUpdatePayload): Promise<PermissionResponse>;
    listPermissions(): Promise<PermissionResponse[]>;
    removeAllPermissions(): Promise<void>;
}

export default IAuthzRepository;
