import {inject} from 'inversify';
import {controller, httpGet, BaseHttpController} from 'inversify-express-utils';
import {StatusCode} from '@digichanges/shared-experience';

import Responder from '../../Shared/Responder';
import {TYPES} from '../../../../types';
import {Locales} from '../../Shared/Express/AppExpress';

@controller('/')
class IndexHandler extends BaseHttpController
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public index()
    {
        return this.responder.send({message: Locales.__('general.greetings')}, this.httpContext.request, this.httpContext.response, StatusCode.HTTP_OK, null);
    }
}

export default IndexHandler;
