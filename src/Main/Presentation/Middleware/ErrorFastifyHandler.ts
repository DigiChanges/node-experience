import FastifyResponder from '../Utils/FastifyResponder';
import ExceptionFactory from '../Factories/ExceptionFactory';
import { ErrorHttpException } from '../Exceptions/ErrorHttpException';

export const ErrorFastifyHandler = async(error: any, request: any, reply: any) =>
{
    const responder = new FastifyResponder();
    const exception: ErrorHttpException = ExceptionFactory.getException(error);

    if (process.env.NODE_ENV !== 'test')
    {
        request.log.error(error.stack);
    }

    await responder.error(exception, reply, exception.statusCode);
};
