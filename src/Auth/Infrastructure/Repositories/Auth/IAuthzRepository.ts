
interface IAuthzRepository
{
    createResource(payload: any): Promise<any>;
    updateResource(payload: any): Promise<any>;
    listResources(): Promise<any>;
    createPolicy(payload: any): Promise<any>;
    listPolicies(): Promise<any>;
    createScopes(payload: any): Promise<any>;
    listScopes(): Promise<any>;
    createPermission(payload: any): Promise<any>;
    updatePermission(payload: any): Promise<any>;
    listPermissions(): Promise<any>;
    removeAllPermissions(): Promise<any>;
}

export default IAuthzRepository;
