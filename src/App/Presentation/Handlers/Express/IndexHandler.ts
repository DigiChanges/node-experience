import { inject } from 'inversify';
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';
import { StatusCode } from '@digichanges/shared-experience';

import { TYPES } from '../../../../types';
import Responder from '../../Shared/Express/Responder';
import Locales from '../../Shared/Locales';

@controller('/')
class IndexHandler extends BaseHttpController
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public index()
    {
        const locales = Locales.getInstance().getLocales();
        return this.responder.send({ message: locales.__('greetings') }, this.httpContext.request, this.httpContext.response, StatusCode.HTTP_OK, null);
    }
}

export default IndexHandler;
