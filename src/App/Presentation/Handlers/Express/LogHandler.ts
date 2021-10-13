import { controller, request, response, next, httpGet } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';

import { inject } from 'inversify';
import { TYPES } from '../../../../types';
import Responder from '../../Shared/Responder';

import GetLogViewUseCase from '../../../Domain/UseCases/GetLogViewUseCase';

@controller('/log')
class LogHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async log(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        return new Promise<string>((resolve, reject) =>
        {
            const use_case = new GetLogViewUseCase();
            const data = use_case.handle();

            this.responder.render(data, 'log', res, resolve, reject);
        });
    }
}
