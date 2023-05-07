import { z } from 'zod';

const CategoryRepSchemaValidation = z.object({
    title: z.string().min(3).max(50),
    enable: z.boolean()
});

export default CategoryRepSchemaValidation;
