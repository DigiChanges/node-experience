import {validate} from "class-validator";
import _ from "lodash";
import ErrorHttpException from "./ErrorHttpException";
import {StatusCode} from "@digichanges/shared-experience";

class ValidatorRequest
{
    static async handle(request: any)
    {
        const errors = await validate(request);

        if (!_.isEmpty(errors))
        {
            throw new ErrorHttpException(StatusCode.HTTP_UNPROCESSABLE_ENTITY, 'Failed Request.', errors);
        }
    }
}

export default ValidatorRequest;
