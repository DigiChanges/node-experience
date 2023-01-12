import IClassValidatorErrorResponse from './IClassValidatorErrorResponse';
import { IPaginatorTransformer } from './IPaginatorTransformer';

export interface IBodyResponse
{
    pagination: IPaginatorTransformer;
    message?: string;
    errors?: IClassValidatorErrorResponse[];
}
