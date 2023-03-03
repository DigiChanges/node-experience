import UserRepSchemaValidation from './UserRepSchemaValidation';
import PasswordSchemaValidation from './PasswordSchemaValidation';
import { checkPassword } from '../../Helpers/Validations';

const UserSaveSchemaValidation = UserRepSchemaValidation.merge(PasswordSchemaValidation).refine(checkPassword.check, checkPassword.message);

export default UserSaveSchemaValidation;
