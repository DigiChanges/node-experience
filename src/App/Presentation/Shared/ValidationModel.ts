import { ValidationError } from 'class-validator';
import _ from 'lodash';

class ValidationModel
{
    property: string;
    constraints: any;
    children: ValidationModel[];

    constructor(errors: ValidationError)
    {
        this.property = errors.property;
        this.constraints = errors.constraints;

        if (!_.isEmpty(errors.children))
        {
            this.children = [];
            errors.children.forEach(_children => this.children.push(new ValidationModel(_children)));
        }
    }
}

export default ValidationModel;
