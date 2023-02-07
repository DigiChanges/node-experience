import UserWithoutPermissionsSchemaValidation from '../User/UserWithoutPermissionsSchemaValidation';
import PasswordSchemaValidation from '../User/PasswordSchemaValidation';

const RegisterSchemaValidation = UserWithoutPermissionsSchemaValidation
    .merge(PasswordSchemaValidation);

export default RegisterSchemaValidation;
