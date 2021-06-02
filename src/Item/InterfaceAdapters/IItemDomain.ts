import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
}

export default IItemDomain;
