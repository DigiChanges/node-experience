import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';
import { StatusCode } from '@digichanges/shared-experience';

import ExpressResponder from '../Shared/Http/ExpressResponder';
import Locales from '../Shared/Locales';

@controller('/')
class IndexExpressHandler extends BaseHttpController
{
    private responder: ExpressResponder;

    constructor()
    {
        super();
        this.responder = new ExpressResponder();
    }

    @httpGet('/')
    public async index()
    {
        const locales = Locales.getInstance().getLocales();
        return await this.responder.send({ message: locales.__('greetings') }, this.httpContext.request, this.httpContext.response, StatusCode.HTTP_OK, null);
    }
}

export default IndexExpressHandler;
