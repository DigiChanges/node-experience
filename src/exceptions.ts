import MainConfig from './Config/MainConfig';

import DecryptForbiddenException from './Shared/Exceptions/DecryptForbiddenException';
import BadCredentialsException from './Auth/Domain/Exceptions/BadCredentialsException';
import UserDisabledException from './Auth/Domain/Exceptions/UserDisabledException';
import CantDisabledException from './Auth/Domain/Exceptions/CantDisabledException';
import PasswordWrongException from './Auth/Domain/Exceptions/PasswordWrongException';
import NotFoundException from './Shared/Exceptions/NotFoundException';
import WrongPermissionsException from './Auth/Domain/Exceptions/WrongPermissionsException';
import InvalidPasswordException from './Shared/Domain/Exceptions/InvalidPasswordException';
import UniqueAttributeException from './Shared/Domain/Exceptions/UniqueAttributeException';
import UnverifiedUserException from './Auth/Domain/Exceptions/UnverifiedUserException';

const config = MainConfig.getInstance().getConfig().statusCode;

const exceptions = {
    [DecryptForbiddenException.name]: config['HTTP_FORBIDDEN'],
    [BadCredentialsException.name]: config['HTTP_FORBIDDEN'],
    [UserDisabledException.name]: config['HTTP_FORBIDDEN'],
    [CantDisabledException.name]: config['HTTP_FORBIDDEN'],
    [PasswordWrongException.name]: config['HTTP_FORBIDDEN'],
    [NotFoundException.name]: config['HTTP_BAD_REQUEST'],
    [WrongPermissionsException.name]: config['HTTP_BAD_REQUEST'],
    [InvalidPasswordException.name]: config['HTTP_UNPROCESSABLE_ENTITY'],
    [UniqueAttributeException.name]: config['HTTP_BAD_REQUEST'],
    [UnverifiedUserException.name]: config['HTTP_FORBIDDEN']
};

export default exceptions;
