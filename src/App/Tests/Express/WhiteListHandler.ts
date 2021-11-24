import { controller, request, response, next, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';

import { inject } from 'inversify';
import { TYPES } from '../../../Config/Injects/types';
import Responder from '../../Presentation/Shared/Express/Responder';
import { StatusCode } from '@digichanges/shared-experience';

@controller('/test')
class WhiteListHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/countries')
    public async testEqualOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }
    @httpGet('/all/:id')
    public async testAllGet(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpPost('/all/hello/world')
    public async testAllPost(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpPut('/all/numeric/123')
    public async testAllPut(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpDelete('/all/:id/delete')
    public async testAllDelete(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id')
    public async testDynamicEqual(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id/states')
    public async testDynamicOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id/states/:stateId/cities')
    public async testDynamicTwo(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/cities/:id/countries/:stateId/states')
    public async testDynamicUntidy(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/:id/hello/all')
    public async testAllUntidy(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }
}
