import { z } from 'zod';

const RefreshTokenSchemaValidation = z.object({
    refreshToken: z.string()
});

export default RefreshTokenSchemaValidation;
