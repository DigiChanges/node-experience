import FileMultipartSchemaValidation from './FileMultipartSchemaValidation';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';

const FileMultipartUpdateSchemaValidation = FileMultipartSchemaValidation.merge(IdSchemaValidation);

export default FileMultipartUpdateSchemaValidation;
