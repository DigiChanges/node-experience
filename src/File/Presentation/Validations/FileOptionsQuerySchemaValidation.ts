import { z } from 'zod';

const FileOptionsQuerySchemaValidation = z.object({
    isOriginalName: z.boolean().default(true).nullish(),
    isPublic: z.boolean().default(true).nullish(),
    isOverwrite: z.boolean().default(true).nullish(),
    isOptimize: z.boolean().default(true).nullish()
});

export default FileOptionsQuerySchemaValidation;
