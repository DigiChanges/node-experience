import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';
import DomainPermissions from '../../../Shared/DomainPermissions';
import {domainPermissions} from '../../../Shared/Decorators/DomainPermissions';

@domainPermissions<AuthPermissions>()
class AuthPermissions extends DomainPermissions
{
    readonly KEEP_ALIVE: string = 'authKeepAlive';
    readonly SYNC_PERMISSIONS: string = 'authSyncPermissions';

    static get I(): AuthPermissions
    {
        return <AuthPermissions> this.instance ?? new AuthPermissions();
    }

    group(): IGroupPermission
    {
        return <IGroupPermission> {
            group: 'AUTH',
            permissions: this.get()
        };
    }

    get(): string[]
    {
        return this.permissions ?? [
            this.KEEP_ALIVE,
            this.SYNC_PERMISSIONS
        ];
    }
}

export default AuthPermissions;

