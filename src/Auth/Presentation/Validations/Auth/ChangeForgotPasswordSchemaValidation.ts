import { z } from 'zod';
import PasswordSchemaValidation from '../User/PasswordSchemaValidation';
import { checkPassword } from '../../Helpers/Validations';

const ChangeForgotPasswordSchemaValidation = z.object({
    confirmationToken: z.string()
}).merge(PasswordSchemaValidation)
    .refine(checkPassword.check, checkPassword.message);

export default ChangeForgotPasswordSchemaValidation;
