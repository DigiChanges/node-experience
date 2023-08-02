import { StatusCode, DecryptForbiddenException, NotFoundException } from '@digichanges/shared-experience';
import BadCredentialsException from './Auth/Domain/Exceptions/BadCredentialsException';
import UserDisabledException from './Auth/Domain/Exceptions/UserDisabledException';
import CantDisabledException from './Auth/Domain/Exceptions/CantDisabledException';
import PasswordWrongException from './Auth/Domain/Exceptions/PasswordWrongException';
import WrongPermissionsException from './Auth/Domain/Exceptions/WrongPermissionsException';
import InvalidPasswordException from './Main/Domain/Exceptions/InvalidPasswordException';
import UniqueAttributeException from './Main/Domain/Exceptions/UniqueAttributeException';
import UnverifiedUserException from './Auth/Domain/Exceptions/UnverifiedUserException';

const exceptions = {
    [DecryptForbiddenException.name]: StatusCode.HTTP_FORBIDDEN,
    [BadCredentialsException.name]: StatusCode.HTTP_FORBIDDEN,
    [UserDisabledException.name]: StatusCode.HTTP_FORBIDDEN,
    [CantDisabledException.name]: StatusCode.HTTP_FORBIDDEN,
    [PasswordWrongException.name]: StatusCode.HTTP_FORBIDDEN,
    [NotFoundException.name]: StatusCode.HTTP_BAD_REQUEST,
    [WrongPermissionsException.name]: StatusCode.HTTP_BAD_REQUEST,
    [InvalidPasswordException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
    [UniqueAttributeException.name]: StatusCode.HTTP_BAD_REQUEST,
    [UnverifiedUserException.name]: StatusCode.HTTP_FORBIDDEN
};

export default exceptions;
