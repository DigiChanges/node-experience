import { z } from 'zod';

const ProductUpdateSchemaValidation = z.object({
    price: z.number(),
    title: z.string().min(3).max(50),
    enable: z.boolean(),
    category: z.string().length(36),
    id: z.string().length(36)
});

export default ProductUpdateSchemaValidation;
