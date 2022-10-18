import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import IUserMinimalDataTransformer from './IUserMinimalDataTransformer';

class UserMinimalDataTransformer extends Transformer
{
    public async transform(user: IUserDomain): Promise<IUserMinimalDataTransformer>
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
