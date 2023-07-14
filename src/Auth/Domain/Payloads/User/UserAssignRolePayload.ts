import { IdPayload } from '@digichanges/shared-experience';

interface UserAssignRolePayload extends IdPayload
{
    roles: Record<string, any>[];
}

export default UserAssignRolePayload;
