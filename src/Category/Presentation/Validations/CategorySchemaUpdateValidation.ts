import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import CategorySchemaSaveValidation from './CategorySchemaSaveValidation';

const CategorySchemaUpdateValidation =
  CategorySchemaSaveValidation.merge(IdSchemaValidation);

export default CategorySchemaUpdateValidation;
