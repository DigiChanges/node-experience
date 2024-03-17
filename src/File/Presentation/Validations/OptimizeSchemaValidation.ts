import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';


const OptimizeSchemaValidation = FileOptionsQuerySchemaValidation.merge(IdSchemaValidation);

export default OptimizeSchemaValidation;
