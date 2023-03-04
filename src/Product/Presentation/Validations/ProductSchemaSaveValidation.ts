import { z } from 'zod';

const ProductSchemaSaveValidation = z.object({
    price: z.number().min(1),
    title: z.string().min(1).max(100),
    enable: z.boolean(),
    category: z.string().uuid()
});

export default ProductSchemaSaveValidation;
