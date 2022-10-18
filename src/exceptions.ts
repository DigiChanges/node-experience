import DecryptForbiddenException from './Shared/Exceptions/DecryptForbiddenException';
import BadCredentialsException from './Auth/Domain/Exceptions/BadCredentialsException';
import UserDisabledException from './Auth/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from './Auth/Domain/Exceptions/RoleDisabledException';
import RoleOfSystemNotDeletedException from './Auth/Domain/Exceptions/RoleOfSystemNotDeletedException';
import CantDisabledException from './Auth/Domain/Exceptions/CantDisabledException';
import PasswordWrongException from './Auth/Domain/Exceptions/PasswordWrongException';
import NotFoundException from './Shared/Exceptions/NotFoundException';
import WrongPermissionsException from './Auth/Domain/Exceptions/WrongPermissionsException';
import InvalidPasswordException from './Shared/Domain/Exceptions/InvalidPasswordException';
import UniqueAttributeException from './Shared/Domain/Exceptions/UniqueAttributeException';
import UnverifiedUserException from './Auth/Domain/Exceptions/UnverifiedUserException';
import StatusCode from './Shared/Application/StatusCode';

const exceptions = {
    [DecryptForbiddenException.name]: StatusCode.HTTP_FORBIDDEN,
    [BadCredentialsException.name]: StatusCode.HTTP_FORBIDDEN,
    [UserDisabledException.name]: StatusCode.HTTP_FORBIDDEN,
    [RoleDisabledException.name]: StatusCode.HTTP_FORBIDDEN,
    [RoleOfSystemNotDeletedException.name]: StatusCode.HTTP_FORBIDDEN,
    [CantDisabledException.name]: StatusCode.HTTP_FORBIDDEN,
    [PasswordWrongException.name]: StatusCode.HTTP_FORBIDDEN,
    [NotFoundException.name]: StatusCode.HTTP_BAD_REQUEST,
    [WrongPermissionsException.name]: StatusCode.HTTP_BAD_REQUEST,
    [InvalidPasswordException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
    [UniqueAttributeException.name]: StatusCode.HTTP_BAD_REQUEST,
    [UnverifiedUserException.name]: StatusCode.HTTP_FORBIDDEN
};

export default exceptions;
