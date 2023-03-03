import { z } from 'zod';
import UserShapeValidation from './UserShapeValidation';

const UserWithoutPermissionsSchemaValidation = z.object(UserShapeValidation);

export default UserWithoutPermissionsSchemaValidation;
