import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';

import ExpressResponder from '../../Application/Http/ExpressResponder';
import Locales from '../Shared/Locales';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';

@controller('/')
class IndexExpressHandler extends BaseHttpController
{
    private responder: ExpressResponder;
    private readonly config: Record<string, IHttpStatusCode>;

    constructor()
    {
        super();
        this.responder = new ExpressResponder();
        this.config = MainConfig.getInstance().getConfig().statusCode;
    }

    @httpGet('/')
    public async index()
    {
        const locales = Locales.getInstance().getLocales();
        return await this.responder.send({ message: locales.__('greetings') }, this.httpContext.request, this.httpContext.response, this.config['HTTP_OK']);
    }
}

export default IndexExpressHandler;
