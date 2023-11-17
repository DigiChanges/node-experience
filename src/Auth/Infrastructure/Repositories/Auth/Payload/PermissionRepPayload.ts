interface PermissionRepPayload
{
    resources: string[];
    policies: string[];
    name: string;
    description: string;
    decisionStrategy: string;
}
export default PermissionRepPayload;
