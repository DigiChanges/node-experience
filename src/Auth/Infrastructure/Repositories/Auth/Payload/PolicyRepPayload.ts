import RolePayload from '../../Role/Payload/RolePayload';

interface PolicyRepPayload
{
    description: string;
    logic: string;
    name: string;
    roles: RolePayload[]
}

export default PolicyRepPayload;
