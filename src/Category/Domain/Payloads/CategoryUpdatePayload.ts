import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ICategoryDomain from '../Entities/ICategoryDomain';

interface UpdateCategoryPayload extends IdPayload, ICategoryDomain {}

export default UpdateCategoryPayload;
