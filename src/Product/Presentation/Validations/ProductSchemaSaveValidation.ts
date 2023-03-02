import { z } from 'zod';

const ProductSchemaSaveValidation = z.object({
  title: z.string().min(2).max(20),
  price: z.number().min(1),
  enable: z.boolean(),
  category: z.string().uuid(),
});

export default ProductSchemaSaveValidation;
