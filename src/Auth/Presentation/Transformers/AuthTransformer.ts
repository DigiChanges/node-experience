import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import ILoginResponse from '../../Domain/Models/ILoginResponse';

class AuthTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(payload: ILoginResponse)
    {
        return {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            expiresIn: payload.expiresIn,
            refreshExpiresIn: payload.refreshExpiresIn
        };
    }
}

export default AuthTransformer;
