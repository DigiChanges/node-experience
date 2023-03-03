import { z } from 'zod';

const RoleSchemaSaveValidation = z.object({
    name: z.string().min(3).max(30),
    permissions: z.array(z.string()).min(0),
    enable: z.boolean().nullish()
});

export default RoleSchemaSaveValidation;
