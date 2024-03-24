import { z } from 'zod';
import FileRepSchemaValidation from './FileRepSchemaValidation';
import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';

const FileMultipartSchemaValidation = z.object({
    file: FileRepSchemaValidation,
    query: FileOptionsQuerySchemaValidation
});

export default FileMultipartSchemaValidation;
