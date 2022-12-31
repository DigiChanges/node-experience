import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import ProductRepPayload from '../Payloads/Product/ProductRepPayload';

interface IProductDomain extends IBaseDomain
{
    price: number;
    title: string;
    active: boolean;

    updateRep(payload: ProductRepPayload): void;
}

export default IProductDomain;
