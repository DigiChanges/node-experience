import DomainRoles from '../../../Shared/DomainRoles';
import {domainRoles} from '../../../Shared/Decorators/DomainRoles';

@domainRoles<SuperAdminRole>()
class SuperAdminRole extends DomainRoles
{
    readonly NAME: string = 'SuperAdmin';

    static get I(): SuperAdminRole
    {
        return <SuperAdminRole> this.instance ?? new SuperAdminRole();
    }
}

export default SuperAdminRole;