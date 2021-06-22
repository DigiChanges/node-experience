import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import Base from '../../../App/Domain/Entities/Base';

class Role extends Base implements IRoleDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];
}

export default Role;
