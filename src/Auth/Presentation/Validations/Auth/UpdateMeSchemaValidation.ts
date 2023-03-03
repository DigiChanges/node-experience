import { z } from 'zod';
import UserWithoutPermissionsSchemaValidation from '../User/UserWithoutPermissionsSchemaValidation';
import UserShapeValidation from '../User/UserShapeValidation';

const UpdateMeSchemaValidation = UserWithoutPermissionsSchemaValidation
    .merge(z.object({
        authUser: z.object(UserShapeValidation)
    }));

export default UpdateMeSchemaValidation;
