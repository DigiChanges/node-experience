import { z } from 'zod';

const CriteriaSchemaValidation = z.object({
    url: z.string(),
    query: z.object({
        pagination: z.object({
            limit: z.string(),
            offset: z.string()
        }).nullish(),
        filter: z.any().nullish(),
        sort: z.any().nullish()
    })
});

export default CriteriaSchemaValidation;
