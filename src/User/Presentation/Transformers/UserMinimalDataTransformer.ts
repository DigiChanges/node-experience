import { Transformer } from '@digichanges/shared-experience';

import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import IUserMinimalDataTransformer from '../../InterfaceAdapters/IUserMinimalDataTransformer';

class UserMinimalDataTransformer extends Transformer
{
    public transform(user: IUserDomain): IUserMinimalDataTransformer
    {
        return {
            id: user.get_id(),
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone
        };
    }
}

export default UserMinimalDataTransformer;
