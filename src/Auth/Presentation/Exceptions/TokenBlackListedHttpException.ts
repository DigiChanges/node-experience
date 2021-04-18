import {StatusCode} from '@digichanges/shared-experience';
import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import {Locales} from '../../../app';

class TokenBlackListedHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.tokenBlackListed'), []);
    }
}

export default TokenBlackListedHttpException;
