import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ProductRepPayload from '../Payloads/ProductRepPayload';

interface IProductDomain extends IBaseDomain, ProductRepPayload
{
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IProductDomain;
