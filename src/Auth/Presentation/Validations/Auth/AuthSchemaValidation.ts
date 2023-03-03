import { z } from 'zod';

const AuthSchemaValidation = z.object({
    email: z.string().email(),
    password: z.string()
});

export default AuthSchemaValidation;
