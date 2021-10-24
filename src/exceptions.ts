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

const exceptions = {
    [DecryptForbiddenException.name]: new DecryptForbiddenHttpException(),
    [BadCredentialsException.name]: new BadCredentialsHttpException(),
    [UserDisabledException.name]: new UserDisabledHttpException(),
    [RoleDisabledException.name]: new RoleDisabledHttpException(),
    [RoleOfSystemNotDeletedException.name]: new RoleOfSystemNotDeletedHttpException(),
    [CantDisabledException.name]: new CantDisabledHttpException(),
    [PasswordWrongException.name]: new PasswordWrongHttpException(),
    [NotFoundException.name]: new NotFoundHttpException(),
    [WrongPermissionsException.name]: new WrongPermissionsHttpException()
};

export default exceptions;