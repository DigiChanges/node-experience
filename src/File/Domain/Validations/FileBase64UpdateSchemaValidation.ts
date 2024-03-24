import FileBase64SchemaValidation from './FileBase64SchemaValidation';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';

const FileBase64UpdateSchemaValidation = FileBase64SchemaValidation.merge(IdSchemaValidation);

export default FileBase64UpdateSchemaValidation;
