import ErrorException from "./ErrorException";
import {ValidationError} from "class-validator";
import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";

class ValidationErrorException extends ErrorException
{
    errors: ValidationError[];

    constructor(statusCode: IStatusCode, message: string, errors: ValidationError[])
    {
        super(statusCode, message);
        this.errors = errors;
    }
}

export default ValidationErrorException;
