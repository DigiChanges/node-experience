import { z } from 'zod';

const ItemSchemaSaveValidation = z.object({
    name: z.string().min(2).max(20),
    type: z.number().min(1).max(100)
});

export default ItemSchemaSaveValidation;
