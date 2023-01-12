import { z } from 'zod';

const RefreshTokenSchemaValidation = z.object({
    refreshToken: z.string().email(),
    decodeToken: z.object({
        id: z.string().uuid(),
        iss: z.string(),
        aud: z.string(),
        sub: z.string(),
        iat: z.string(),
        exp: z.string(),
        userId: z.string().uuid(),
        email: z.string().email()
    })
});

export default RefreshTokenSchemaValidation;
