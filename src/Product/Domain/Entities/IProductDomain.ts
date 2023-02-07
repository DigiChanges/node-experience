import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ProductRepPayload from '../Payload/ProductRepPayload';

interface IProdcutDomain extends IBaseDomain, ProductRepPayload
{
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IProdcutDomain;