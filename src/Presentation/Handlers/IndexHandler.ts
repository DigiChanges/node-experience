import {controller, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import {lazyInject } from "../../inversify.config";
import StatusCode from "../Shared/StatusCode";
import Responder from "../Shared/Responder";
import {TYPES} from "../../types";

@controller('/')
class IndexHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async index (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        this.responder.send({message: 'Greetings to Node Experience'}, res, StatusCode.HTTP_OK, null);
    }
}

export default IndexHandler;
