import DecryptForbiddenException from './Shared/Exceptions/DecryptForbiddenException';
import DecryptForbiddenHttpException from './App/Presentation/Exceptions/DecryptForbiddenHttpException';
import BadCredentialsException from './Auth/Domain/Exceptions/BadCredentialsException';
import BadCredentialsHttpException from './Auth/Presentation/Exceptions/BadCredentialsHttpException';
import UserDisabledException from './User/Domain/Exceptions/UserDisabledException';
import UserDisabledHttpException from './User/Presentation/Exceptions/UserDisabledHttpException';
import RoleDisabledException from './Role/Domain/Exceptions/RoleDisabledException';
import RoleDisabledHttpException from './Role/Presentation/Exceptions/RoleDisabledHttpException';
import RoleOfSystemNotDeletedException from './Role/Domain/Exceptions/RoleOfSystemNotDeletedException';
import RoleOfSystemNotDeletedHttpException from './Role/Presentation/Exceptions/RoleOfSystemNotDeletedHttpException';
import CantDisabledException from './Auth/Domain/Exceptions/CantDisabledException';
import CantDisabledHttpException from './Auth/Presentation/Exceptions/CantDisabledHttpException';
import PasswordWrongException from './Auth/Domain/Exceptions/PasswordWrongException';
import PasswordWrongHttpException from './Auth/Presentation/Exceptions/PasswordWrongHttpException';
import NotFoundException from './Shared/Exceptions/NotFoundException';
import NotFoundHttpException from './App/Presentation/Exceptions/NotFoundHttpException';
import WrongPermissionsException from './Auth/Domain/Exceptions/WrongPermissionsException';
import WrongPermissionsHttpException from './Auth/Presentation/Exceptions/WrongPermissionsHttpException';
import InvalidPasswordException from './App/Domain/Exceptions/InvalidPasswordException';
import InvalidPasswordHttpException from './App/Presentation/Exceptions/InvalidPasswordHttpException';
import UniqueAttributeException from './App/Domain/Exceptions/UniqueAttributeException';
import UniqueAttributeHttpException from './App/Presentation/Exceptions/UniqueAttributeHttpException';

const exceptions = {
    [DecryptForbiddenException.name]: DecryptForbiddenHttpException,
    [BadCredentialsException.name]: BadCredentialsHttpException,
    [UserDisabledException.name]: UserDisabledHttpException,
    [RoleDisabledException.name]: RoleDisabledHttpException,
    [RoleOfSystemNotDeletedException.name]: RoleOfSystemNotDeletedHttpException,
    [CantDisabledException.name]: CantDisabledHttpException,
    [PasswordWrongException.name]: PasswordWrongHttpException,
    [NotFoundException.name]: NotFoundHttpException,
    [WrongPermissionsException.name]: WrongPermissionsHttpException,
    [InvalidPasswordException.name]: InvalidPasswordHttpException,
    [UniqueAttributeException.name]: UniqueAttributeHttpException
};

export default exceptions;
