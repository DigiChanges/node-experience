import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import ProductRepPayload from '../Payloads/ProductRepPayload';

interface IProductDomain extends IBaseDomain, ProductRepPayload
{
    getCategory(): ICategoryDomain;
}

export default IProductDomain;
