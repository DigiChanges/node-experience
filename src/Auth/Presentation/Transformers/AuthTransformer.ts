import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IToken from '../../Domain/Models/IToken';
import RoleUserTransformer from '../../../Role/Presentation/Transformers/RoleUserTransformer';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
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

        return {
            user: {
                id: token.getUser().getId(),
                firstName: token.getUser().firstName,
                lastName: token.getUser().lastName,
                email: token.getUser().email,
                enable: token.getUser().enable,
                permissions: authService.getPermissions(user),
                roles: await this.roleUserTransformer.handle(token.getUser().roles),
                createdAt: moment(token.getUser().createdAt).utc().unix(),
                updatedAt: moment(token.getUser().updatedAt).utc().unix()
            },
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}

export default AuthTransformer;
