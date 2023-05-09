import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IProductDomain from '../Entities/IProductDomain';

interface UpdateProductPayload extends IdPayload, IProductDomain {}

export default UpdateProductPayload;
