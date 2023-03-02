import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import ProductSchemaSaveValidation from './ProductSchemaSaveValidation';

const ProductSchemaUpdateValidation =
  ProductSchemaSaveValidation.merge(IdSchemaValidation);

export default ProductSchemaUpdateValidation;
