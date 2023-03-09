import { z } from 'zod';

const AuthSchemaValidation = z.object({
    username: z.string(),
    password: z.string()
});

export default AuthSchemaValidation;
