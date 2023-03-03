import { z } from 'zod';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

const PartialUserAssignSchemaValidation = z.object({
    rolesId: z.array(z.string().uuid()).min(0)
});

const UserAssignSchemaValidation = PartialUserAssignSchemaValidation.merge(IdSchemaValidation);

export default UserAssignSchemaValidation;
