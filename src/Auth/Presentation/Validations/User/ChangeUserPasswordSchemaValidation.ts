import PasswordSchemaValidation from './PasswordSchemaValidation';
import { checkPassword } from '../../Helpers/Validations';
import IdSchemaValidation from '../../../../Main/Presentation/Validations/IdSchemaValidation';

const ChangeUserPasswordSchemaValidation = PasswordSchemaValidation.merge(IdSchemaValidation).refine(checkPassword.check, checkPassword.message);

export default ChangeUserPasswordSchemaValidation;
