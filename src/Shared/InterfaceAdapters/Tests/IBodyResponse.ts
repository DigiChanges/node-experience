import { IClassValidatorErrorResponse } from './IClassValidatorErrorResponse';
import { IPaginatorTransformer } from './IPaginatorTransformer';

export interface IBodyResponse
{
    status: number;
    statusCode: string;
    metadata: {
        refreshToken: string;
    };
    pagination: IPaginatorTransformer;
    message?: string;
    errors?: IClassValidatorErrorResponse[];
}
