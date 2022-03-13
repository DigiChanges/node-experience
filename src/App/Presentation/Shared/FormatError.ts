import _ from 'lodash';
import ValidationModel from './ValidationModel';
import ErrorHttpException from './ErrorHttpException';
import { StatusCode } from '@digichanges/shared-experience';

class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        const { statusCode, message, errors, metadata, errorCode } = errorHttpException;
        const validationModels: ValidationModel[] = [];

        if (!_.isEmpty(errors))
        {
            for (const error of errors)
            {
                const validationModel = new ValidationModel(error);
                validationModels.push(validationModel);
            }
        }

        return {
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errorCode,
            errors: _.isEmpty(validationModels) ? null : validationModels,
            metadata
        };
    };
}

export default FormatError;
