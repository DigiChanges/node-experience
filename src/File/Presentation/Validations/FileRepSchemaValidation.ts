import { z } from 'zod';

const FileRepSchemaValidation = z.object({
    originalName: z.string().min(1),
    mimeType: z.string().min(2),
    base64: z.string().min(5).nullish(),
    destination: z.string().min(1).nullish(),
    extension: z.string(),
    filename: z.string().min(4),
    path: z.string().min(1).default('/'),
    size: z.number().min(1),
    encoding: z.string().min(1).nullish(),
    isImage: z.boolean().default(false)
});

export default FileRepSchemaValidation;
