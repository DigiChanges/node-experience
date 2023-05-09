
import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import ProductRepPayload from '../Payloads/ProductRepPayload';

interface IProductDomain extends IBaseDomain, ProductRepPayload
{
    updateBuild(payload: ProductRepPayload): void
}

export default IProductDomain;
