import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<AppPermissions>()
class AppPermissions extends DomainPermissions
{
    readonly ALL: string = 'all';
    readonly GET_PERMISSIONS: string = 'getPermissions';

    static get I(): AppPermissions
    {
        return <AppPermissions> this.instance ?? new AppPermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'APP',
            permissions: this.get()
        };
    }

    get(): string[]
    {
        return this.permissions ?? [
            this.ALL,
            this.GET_PERMISSIONS
        ];
    }
}

export default AppPermissions;

