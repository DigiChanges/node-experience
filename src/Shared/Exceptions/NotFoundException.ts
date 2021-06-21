import {ErrorException} from '@digichanges/shared-experience';
import {Locales} from '../../App/Presentation/Shared/Express/AppExpress';

class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        super(`${entity} ${Locales.__('general.exceptions.notFound')}`, NotFoundException.name);
    }
}

export default NotFoundException;
