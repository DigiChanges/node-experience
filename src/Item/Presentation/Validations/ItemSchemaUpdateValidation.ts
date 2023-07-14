import ItemSchemaSaveValidation from './ItemSchemaSaveValidation';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
