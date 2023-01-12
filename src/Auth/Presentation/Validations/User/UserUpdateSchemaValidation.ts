import { z } from 'zod';
import UserRepSchemaValidation from './UserRepSchemaValidation';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

const PartialUserUpdateSchemaValidation = UserRepSchemaValidation.merge(IdSchemaValidation);

const UserUpdateSchemaValidation = z.object({
    userId: z.string().uuid()
}).merge(PartialUserUpdateSchemaValidation);

export default UserUpdateSchemaValidation;
