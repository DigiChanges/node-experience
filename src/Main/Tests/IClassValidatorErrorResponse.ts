
interface IClassValidatorErrorResponse
{
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
}

export default IClassValidatorErrorResponse;
