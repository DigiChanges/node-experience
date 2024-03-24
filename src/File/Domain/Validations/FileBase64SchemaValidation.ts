import { z } from 'zod';
import PartialFileSchemaValidation from './PartialFileSchemaValidation';

const FileBase64SchemaValidation = PartialFileSchemaValidation.merge(z.object({
    base64: z.string().min(1)
}));

export default FileBase64SchemaValidation;
