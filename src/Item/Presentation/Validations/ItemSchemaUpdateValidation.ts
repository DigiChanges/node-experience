import ItemSchemaSaveValidation from './ItemSchemaSaveValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

const ItemSchemaUpdateValidation = ItemSchemaSaveValidation.merge(IdSchemaValidation);

export default ItemSchemaUpdateValidation;
