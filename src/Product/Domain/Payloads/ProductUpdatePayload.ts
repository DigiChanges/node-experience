import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductRepPayload from './ProductRepPayload';

interface ProductUpdatePayload extends IdPayload, ProductRepPayload {}

export default ProductUpdatePayload;
