import { z } from 'zod';

const CriteriaSchemaValidation = z.object({
    sort: z.any().nullish(),
    filter: z.any().nullish(),
    pagination: z.object({
        pagination: z.object({
            limit: z.string(),
            offset: z.string()
        }).nullish(),
        url: z.string(),
        host: z.string(),
        exist: z.boolean()
    })
});

export default CriteriaSchemaValidation;
