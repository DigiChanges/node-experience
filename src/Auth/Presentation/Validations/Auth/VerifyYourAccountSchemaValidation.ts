import { z } from 'zod';

const VerifyYourAccountSchemaValidation = z.object({
    confirmationToken: z.string()
});

export default VerifyYourAccountSchemaValidation;
