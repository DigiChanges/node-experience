import CategorySchemaSaveValidation from './CategorySchemaSaveValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

const CategorySchemaUpdateValidation = CategorySchemaSaveValidation.merge(IdSchemaValidation);

export default CategorySchemaUpdateValidation;
