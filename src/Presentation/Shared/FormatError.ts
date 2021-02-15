import _ from "lodash";
import ValidationModel from "../../Application/Shared/ValidationModel";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class FormatError
{
    getFormat = (errorHttpException: ErrorHttpException): any =>
    {
        let {statusCode, message, errors} = errorHttpException;
        let validationModels: ValidationModel[] = [];

        if (!_.isEmpty(errors))
        {
            for (const error of errors)
            {
                const validationModel = new ValidationModel(error);
                validationModels.push(validationModel);
            }
        }

        return {
            status: statusCode.status,
            code: statusCode.code,
            statusCode: statusCode.statusCode,
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errors: _.isEmpty(validationModels) ? null : validationModels
        };
    };
}

export default FormatError;
