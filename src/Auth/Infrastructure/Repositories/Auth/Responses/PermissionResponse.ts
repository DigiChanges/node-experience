interface PermissionResponse
{
    id: string;
    name: string;
    description: string;
    type: string;
    policies?: string[]
    resources?: string[]
    logic: string;
    decisionStrategy: string;
}

export default PermissionResponse;
