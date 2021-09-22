import DomainRoles from '../../../Shared/DomainRoles';
import {domainRoles} from '../../../Shared/Decorators/DomainRoles';

@domainRoles<AdminRole>()
class AdminRole extends DomainRoles
{
    readonly NAME: string = 'Admin';

    static get I(): AdminRole
    {
        return <AdminRole> this.instance ?? new AdminRole();
    }
}

export default AdminRole;