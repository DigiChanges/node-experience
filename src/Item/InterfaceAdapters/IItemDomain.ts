import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
    created_by: IUserDomain;
    last_modified_by: IUserDomain;

    get_created_by(): IUserDomain;
    get_last_modified_by(): IUserDomain;
}

export default IItemDomain;
