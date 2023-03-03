import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IToken from '../../Domain/Models/IToken';
import RoleUserTransformer from './RoleUserTransformer';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import AuthService from '../../Domain/Services/AuthService';

class AuthTransformer extends Transformer
{
    private roleUserTransformer: RoleUserTransformer;

    constructor()
    {
        super();
        this.roleUserTransformer = new RoleUserTransformer();
    }

    public async transform(token: IToken)
    {
        const user: IUserDomain = token.getUser();
        const authService: AuthService = new AuthService();
        dayjs.extend(utc);

        return {
            user: {
                id: token.getUser().getId(),
                firstName: token.getUser().firstName,
                lastName: token.getUser().lastName,
                email: token.getUser().email,
                enable: token.getUser().enable,
                permissions: authService.getPermissions(user),
                isSuperAdmin: token.getUser().isSuperAdmin,
                roles: await this.roleUserTransformer.handle(token.getUser().roles),
                createdAt: dayjs(token.getUser().createdAt).utc().unix(),
                updatedAt: dayjs(token.getUser().updatedAt).utc().unix()
            },
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}

export default AuthTransformer;
