import { z } from 'zod';
import PasswordSchemaValidation from './PasswordSchemaValidation';
import MainConfig from '../../../../Config/MainConfig';
import { checkPassword } from '../../Helpers/Validations';

const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

const PartialChangeMyPasswordSchemaValidation = z.object({
    currentPassword: z.string().min(minLength).max(maxLength),
    id: z.string().uuid()
});

const ChangeMyPasswordSchemaValidation = PasswordSchemaValidation.merge(PartialChangeMyPasswordSchemaValidation).refine(checkPassword.check, checkPassword.message);

export default ChangeMyPasswordSchemaValidation;
