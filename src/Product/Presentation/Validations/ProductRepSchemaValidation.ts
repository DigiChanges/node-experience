import { z } from 'zod';

const ProductRepSchemaValidation = z.object({
    price: z.number(),
    title: z.string().min(2).max(50),
    enable: z.boolean(),
    category: z.string().length(36)
});

export default ProductRepSchemaValidation;
