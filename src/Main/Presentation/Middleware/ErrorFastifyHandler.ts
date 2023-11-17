import FastifyResponder from '../Utils/FastifyResponder';
import { ErrorHttpException } from '@digichanges/shared-experience';
import ExceptionFactory from '../Factories/ExceptionFactory';

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
