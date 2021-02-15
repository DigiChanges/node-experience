import {inject} from "inversify";
import {controller, httpGet, BaseHttpController} from "inversify-express-utils";
import {StatusCode} from "@digichanges/shared-experience";

import Responder from "../Shared/Responder";
import {TYPES} from "../../types";

@controller('/')
class IndexHandler extends BaseHttpController
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async index ()
    {
        return this.responder.send({message: 'Welcome to Node Experience'}, this.httpContext.request, this.httpContext.response, StatusCode.HTTP_OK, null);
    }
}

export default IndexHandler;
