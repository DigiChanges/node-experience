import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';

interface IRoleDomain extends IBaseDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];
}

export default IRoleDomain;
