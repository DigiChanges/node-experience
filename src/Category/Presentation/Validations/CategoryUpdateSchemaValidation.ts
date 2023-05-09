import { z } from 'zod';

const CategoryUpdateSchemaValidation = z.object({
    title: z.string().min(3).max(50),
    enable: z.boolean(),
    id: z.string().length(36)
});

export default CategoryUpdateSchemaValidation;
