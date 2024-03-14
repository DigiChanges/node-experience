import { z } from 'zod';

const PartialFileSchemaValidation = z.object({
    filename: z.string().min(1),
    originalName: z.string().min(1),
    mimeType: z.string().min(1),
    path: z.string().min(1).default('/'),
    extension: z.string().min(1),
    size: z.number().min(1),
    isImage: z.boolean().default(false)
});

export default PartialFileSchemaValidation;
