import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IToken from '../../InterfaceAdapters/IToken';
import RoleUserTransformer from '../../../Role/Presentation/Transformers/RoleUserTransformer';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import AuthService from '../../Services/AuthService';

class AuthTransformer extends Transformer
{
    private role_user_transformer: RoleUserTransformer;

    constructor()
    {
        super();
        this.role_user_transformer = new RoleUserTransformer();
    }

    public transform(token: IToken)
    {
        const user: IUserDomain = token.get_user();
        const auth_service: AuthService = new AuthService();

        return {
            user: {
                id: token.get_user().get_id(),
                first_name: token.get_user().first_name,
                last_name: token.get_user().last_name,
                email: token.get_user().email,
                enable: token.get_user().enable,
                permissions: auth_service.get_permissions(user),
                roles: this.role_user_transformer.handle(token.get_user().roles),
                createdAt: moment(token.get_user().createdAt).utc().unix(),
                updatedAt: moment(token.get_user().updatedAt).utc().unix()
            },
            expires: token.get_expires(),
            token: token.get_hash()
        };
    }
}

export default AuthTransformer;
