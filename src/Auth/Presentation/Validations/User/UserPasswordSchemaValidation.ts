import PasswordSchemaValidation from './PasswordSchemaValidation';
import { checkPassword } from '../../Helpers/Validations';

const UserPasswordSchemaValidation = PasswordSchemaValidation.refine(checkPassword.check, checkPassword.message);

export default UserPasswordSchemaValidation;
