import { z } from 'zod';
import MainConfig from '../../../../Config/MainConfig';

const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

const PasswordSchemaValidation = z.object({
    password: z.string().min(minLength).max(maxLength),
    passwordConfirmation: z.string().min(minLength).max(maxLength)
});

export default PasswordSchemaValidation;
