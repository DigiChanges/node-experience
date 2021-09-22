import IBasicPermissions from '../../Shared/InterfaceAdapters/IBasicPermissions';

interface IUsersPermissions extends IBasicPermissions
{
    readonly ASSIGN_ROLE: string;
    readonly CHANGE_MY_PASSWORD: string;
    readonly CHANGE_USER_PASSWORD:string;
}

export default IUsersPermissions;