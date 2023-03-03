import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';


const OptimizeSchemaValidation = FileOptionsQuerySchemaValidation.merge(IdSchemaValidation);

export default OptimizeSchemaValidation;
