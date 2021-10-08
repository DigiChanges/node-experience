import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';

interface IRoleDomain extends IBaseDomain
{
    name: string;
    slug: string;
    enable: boolean;
    of_system: boolean;
    permissions: string[];
}

export default IRoleDomain;
