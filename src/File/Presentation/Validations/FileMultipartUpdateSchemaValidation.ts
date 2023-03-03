import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import FileMultipartSchemaValidation from './FileMultipartSchemaValidation';

const FileMultipartUpdateSchemaValidation = FileMultipartSchemaValidation.merge(IdSchemaValidation);

export default FileMultipartUpdateSchemaValidation;
