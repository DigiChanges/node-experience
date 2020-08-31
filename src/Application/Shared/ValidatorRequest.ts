import {validate} from "class-validator";
import _ from "lodash";
import ValidationErrorException from "./ValidationErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";

class ValidatorRequest
{
    static async handle(request: any)
    {
        const errors = await validate(request);

        if (!_.isEmpty(errors))
        {
            throw new ValidationErrorException(StatusCode.HTTP_FORBIDDEN, 'Failed Request.', errors);
        }
    }
}

export default ValidatorRequest;