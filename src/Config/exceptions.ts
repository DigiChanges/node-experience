import { StatusCode } from '../Main/Presentation/Application/StatusCode';
import InvalidPasswordException from '../Main/Domain/Exceptions/InvalidPasswordException';
import ForbiddenException from '../Auth/Domain/Exceptions/ForbiddenException';
import { DecryptForbiddenException } from '../Main/Infrastructure/Exceptions/DecryptForbiddenException';
import { NotFoundException } from '../Main/Domain/Exceptions/NotFoundException';

const exceptions = {
    [DecryptForbiddenException.name]: StatusCode.HTTP_FORBIDDEN,
    [NotFoundException.name]: StatusCode.HTTP_BAD_REQUEST,
    [InvalidPasswordException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
    [ForbiddenException.name]: StatusCode.HTTP_FORBIDDEN
};

export default exceptions;
