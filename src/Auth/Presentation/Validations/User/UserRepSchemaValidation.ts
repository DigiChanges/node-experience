import { z } from 'zod';
import UserWithoutPermissionsSchemaValidation from './UserWithoutPermissionsSchemaValidation';

const PartialUserRepSchemaValidation = z.object({
    enable: z.boolean().nullish()
});

const UserRepSchemaValidation = UserWithoutPermissionsSchemaValidation.merge(PartialUserRepSchemaValidation);

export default UserRepSchemaValidation;
