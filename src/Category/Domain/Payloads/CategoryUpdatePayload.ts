import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import CategoryRepPayload from './CategoryRepPayload';

interface CategoryUpdatePayload extends IdPayload, CategoryRepPayload {}

export default CategoryUpdatePayload;
