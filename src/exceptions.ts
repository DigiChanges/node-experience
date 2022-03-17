import { StatusCode } from '@digichanges/shared-experience';
import DecryptForbiddenException from './Shared/Exceptions/DecryptForbiddenException';
import BadCredentialsException from './Auth/Domain/Exceptions/BadCredentialsException';
import UserDisabledException from './User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from './Role/Domain/Exceptions/RoleDisabledException';
import RoleOfSystemNotDeletedException from './Role/Domain/Exceptions/RoleOfSystemNotDeletedException';
import CantDisabledException from './Auth/Domain/Exceptions/CantDisabledException';
import PasswordWrongException from './Auth/Domain/Exceptions/PasswordWrongException';
import NotFoundException from './Shared/Exceptions/NotFoundException';
import WrongPermissionsException from './Auth/Domain/Exceptions/WrongPermissionsException';
import InvalidPasswordException from './App/Domain/Exceptions/InvalidPasswordException';
import UniqueAttributeException from './App/Domain/Exceptions/UniqueAttributeException';
import UnverifiedUserException from './User/Domain/Exceptions/UnverifiedUserException';

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
