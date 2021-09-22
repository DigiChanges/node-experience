import DomainRoles from '../../../Shared/DomainRoles';
import {domainRoles} from '../../../Shared/Decorators/DomainRoles';

@domainRoles<OperatorRole>()
class OperatorRole extends DomainRoles
{
    readonly NAME: string = 'Operator';

    static get I(): OperatorRole
    {
        return <OperatorRole> this.instance ?? new OperatorRole();
    }
}

export default OperatorRole;