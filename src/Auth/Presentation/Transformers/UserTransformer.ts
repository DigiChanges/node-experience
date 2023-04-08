import IUserDomain from '../../Domain/Entities/IUserDomain';
import IUserTransformer from './IUserTransformer';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

class UserTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(user: IUserDomain): Promise<IUserTransformer>
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthdate: user.birthdate,
            genre: user.genre,
            phone: user.phone,
            country: user.country,
            enable: user.enable
        };
    }
}

export default UserTransformer;
