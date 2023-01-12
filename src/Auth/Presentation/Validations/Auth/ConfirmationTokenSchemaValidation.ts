import { z } from 'zod';

const ConfirmationSchemaValidation = z.object({
    confirmationToken: z.string()
});

export default ConfirmationSchemaValidation;
