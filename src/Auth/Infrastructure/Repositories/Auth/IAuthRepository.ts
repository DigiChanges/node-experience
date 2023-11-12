import PermissionPayload from './Payload/PermissionPayload';

interface IAuthRepository
{
    checkPermissions(payload: PermissionPayload): Promise<Record<string, unknown>>
}

export default IAuthRepository;
