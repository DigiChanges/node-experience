import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductRepPayload from './IProductRepPayload';

interface ProductUpdatePayload extends IdPayload, ProductRepPayload {}

export default ProductUpdatePayload;
