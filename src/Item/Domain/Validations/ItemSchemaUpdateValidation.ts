import ItemSchemaSaveValidation from './ItemSchemaSaveValidation';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
