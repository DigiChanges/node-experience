import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';


const OptimizeSchemaValidation = FileOptionsQuerySchemaValidation.merge(IdSchemaValidation);

export default OptimizeSchemaValidation;
