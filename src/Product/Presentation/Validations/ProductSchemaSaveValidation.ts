import { z } from 'zod';

const ProductSchemaSaveValidation = z.object({
    price: z.number(),
    title: z.string().min(1).max(100),
    enable: z.boolean(),
    category: z.object({
        title: z.string().min(1).max(100),
        enable: z.boolean()
    })
});

export default ProductSchemaSaveValidation;
