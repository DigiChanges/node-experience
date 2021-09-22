import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<UserPermissions>()
class UserPermissions extends DomainPermissions
{
    readonly SAVE: string = 'usersSave';
    readonly UPDATE: string = 'usersUpdate';
    readonly SHOW: string = 'usersShow';
    readonly LIST: string = 'usersList';
    readonly DELETE: string = 'usersDelete';
    readonly ASSIGN_ROLE: string = 'usersAssignRole';
    readonly CHANGE_MY_PASSWORD: string = 'usersChangeMyPassword';
    readonly CHANGE_USER_PASSWORD:string = 'usersChangeUserPassword';

    static get I(): UserPermissions
    {
        return <UserPermissions> this.instance ?? new UserPermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'USERS',
            permissions: this.get()
        };
    }

    get(): string[]
    {
        return this.permissions ?? [
            this.SAVE,
            this.UPDATE,
            this.SHOW,
            this.LIST,
            this.DELETE,
            this.ASSIGN_ROLE,
            this.CHANGE_MY_PASSWORD,
            this.CHANGE_USER_PASSWORD
        ];
    }
}

export default UserPermissions;
