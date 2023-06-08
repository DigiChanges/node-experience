import RolePayload from '../../Role/Payload/RolePayload';

interface PolicyResponse
{
    id: string;
    name: string;
    description: string;
    type: string;
    logic: string;
    decisionStrategy: string;
    roles?: RolePayload[];
    config?: {
        roles: string
    };
}

export default PolicyResponse;
