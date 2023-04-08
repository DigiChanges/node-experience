import { z } from 'zod';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

const PartialUserAssignSchemaValidation = z.object({
    roles: z.array(z.object({
        id: z.string().uuid(),
        name: z.string()
    })).min(1)
});

const UserAssignSchemaValidation = PartialUserAssignSchemaValidation.merge(IdSchemaValidation);

export default UserAssignSchemaValidation;
