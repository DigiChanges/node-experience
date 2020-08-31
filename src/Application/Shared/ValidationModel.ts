import {ValidationError} from "class-validator";

class ValidationModel
{
    property: string;
    constraints: object;

    constructor(errors: ValidationError)
    {
        this.property = errors.property;
        this.constraints = errors.constraints;
    }
}

export default ValidationModel;