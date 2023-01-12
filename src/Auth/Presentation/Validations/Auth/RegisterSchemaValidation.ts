import UserWithoutPermissionsSchemaValidation from '../User/UserWithoutPermissionsSchemaValidation';
import PasswordSchemaValidation from '../User/PasswordSchemaValidation';
import ConfirmationTokenSchemaValidation from './ConfirmationTokenSchemaValidation';

const RegisterSchemaValidation = UserWithoutPermissionsSchemaValidation
    .merge(PasswordSchemaValidation)
    .merge(ConfirmationTokenSchemaValidation);

export default RegisterSchemaValidation;
