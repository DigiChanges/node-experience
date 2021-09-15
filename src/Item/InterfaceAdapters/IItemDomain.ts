import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';

interface IItemDomain extends IBaseDomain
{
    getName(): string;
    setName(name: string): void;
    getType(): number;
    setType(type: number): void;
    getCreatedBy(): IUserDomain;
    setCreatedBy(createdBy: IUserDomain): void;
    getLastModifiedBy(): IUserDomain;
    setLastModifiedBy(lastModifiedBy: IUserDomain): void;
}

export default IItemDomain;
