import { z } from 'zod';
import FileOptionsQuerySchemaValidation from './FileOptionsQuerySchemaValidation';

const ListObjectsSchemaValidation = z.object({
    recursive: z.string().nullish(),
    prefix: z.string().nullish()
}).merge(FileOptionsQuerySchemaValidation);

export default ListObjectsSchemaValidation;
