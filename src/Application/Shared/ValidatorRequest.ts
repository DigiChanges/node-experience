import {validate} from "class-validator";
import _ from "lodash";
import StatusCode from "../../Presentation/Shared/StatusCode";
import ErrorHttpException from "./ErrorHttpException";

class ValidatorRequest
{
    static async handle(request: any)
    {
        const errors = await validate(request);

        if (!_.isEmpty(errors))
        {
            throw new ErrorHttpException(StatusCode.HTTP_FORBIDDEN, 'Failed Request.', errors);
        }
    }
}

export default ValidatorRequest;
