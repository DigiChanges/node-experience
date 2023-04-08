import { z } from 'zod';

const RegisterSchemaValidation = z.object({
    email: z.string().email()
});

export default RegisterSchemaValidation;
