import { Transformer } from '@digichanges/shared-experience';

import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import IUserMinimalDataTransformer from '../../InterfaceAdapters/IUserMinimalDataTransformer';

class UserMinimalDataTransformer extends Transformer
{
    public transform(user: IUserDomain): IUserMinimalDataTransformer
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        };
    }
}

export default UserMinimalDataTransformer;
