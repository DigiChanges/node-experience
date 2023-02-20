import { z } from 'zod';

const ProductSchemaSaveValidation = z.object({
    title: z.string().min(3).max(255),
    price: z.number().min(0),
    enable: z.boolean(),
    category: z.string().uuid()
});

export default ProductSchemaSaveValidation;
