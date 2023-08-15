import { z } from 'zod';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';

const PartialDownloadSchemaValidation = z.object({
    version: z.number().min(1).nullish()
});

const DownloadSchemaValidation = PartialDownloadSchemaValidation.merge(IdSchemaValidation);

export default DownloadSchemaValidation;
