import { z } from 'zod';

const RegisterSchemaValidation = z.object({
    email: z.string().email(),
    passwordRequestedAt: z.date()
});

export default RegisterSchemaValidation;
