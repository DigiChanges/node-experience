import { z } from 'zod';

const IdSchemaValidation = z.object({
    id: z.string().uuid()
});

export default IdSchemaValidation;
