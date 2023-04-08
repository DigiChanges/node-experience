import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import ILoginResponse from '../../Domain/Models/ILoginResponse';
import UserTransformer from './UserTransformer';

class AuthTransformer extends Transformer
{
    private userTransformer: UserTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserTransformer();
    }

    public async transform(payload: ILoginResponse)
    {
        return {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            expiresIn: payload.expiresIn,
            refreshExpiresIn: payload.refreshExpiresIn,
            user: await this.userTransformer.transform(payload.user)
        };
    }
}

export default AuthTransformer;
