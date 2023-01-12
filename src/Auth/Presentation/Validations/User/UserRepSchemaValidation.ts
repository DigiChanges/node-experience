import { z } from 'zod';
import UserWithoutPermissionsSchemaValidation from './UserWithoutPermissionsSchemaValidation';

const PartialUserRepSchemaValidation = z.object({
    enable: z.boolean().nullish(),
    permissions: z.array(z.string()).min(0)
});

const UserRepSchemaValidation = UserWithoutPermissionsSchemaValidation.merge(PartialUserRepSchemaValidation);

export default UserRepSchemaValidation;
