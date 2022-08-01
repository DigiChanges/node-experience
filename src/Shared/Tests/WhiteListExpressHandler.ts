import { controller, request, response, next, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';

import ExpressResponder from '../Application/Http/ExpressResponder';
import StatusCode from '../../Shared/Application/StatusCode';

@controller('/test')
class WhiteListExpressHandler
{
    private responder: ExpressResponder;

    constructor()
    {
        this.responder = new ExpressResponder();
    }

    @httpGet('/countries')
    public async testEqualOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/all/:id')
    public async testAllGet(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpPost('/all/hello/world')
    public async testAllPost(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpPut('/all/numeric/123')
    public async testAllPut(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpDelete('/all/:id/delete')
    public async testAllDelete(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id')
    public async testDynamicEqual(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id/states')
    public async testDynamicOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/countries/:id/states/:stateId/cities')
    public async testDynamicTwo(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/cities/:id/countries/:stateId/states')
    public async testDynamicUntidy(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }

    @httpGet('/:id/hello/all')
    public async testAllUntidy(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        void await this.responder.send({ message: 'hello world' }, null, res, StatusCode.HTTP_OK);
    }
}
