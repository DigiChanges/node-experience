import { z } from 'zod';
import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';

const PresignedFileSchemaValidation = z.object({
    file: z.string().uuid(),
    expiry: z.number().min(241920),
    version: z.number().min(1),
    query: FileOptionsQuerySchemaValidation
});

export default PresignedFileSchemaValidation;
