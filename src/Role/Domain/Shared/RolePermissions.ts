import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<RolePermissions>()
class RolePermissions extends DomainPermissions
{
    readonly SAVE: string = 'rolesSave';
    readonly UPDATE: string = 'rolesUpdate';
    readonly SHOW: string = 'rolesShow';
    readonly LIST: string = 'rolesList';
    readonly DELETE: string = 'rolesDelete';

    static get I(): RolePermissions
    {
        return <RolePermissions> this.instance ?? new RolePermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'ROLES',
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
            this.DELETE
        ];
    }
}

export default RolePermissions;

