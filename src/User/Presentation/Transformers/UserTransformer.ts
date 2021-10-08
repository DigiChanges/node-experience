import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import RoleTransformer from '../../../Role/Presentation/Transformers/RoleTransformer';
import IUserTransformer from '../../InterfaceAdapters/IUserTransformer';

class UserTransformer extends Transformer
{
    private role_transformer: RoleTransformer;

    constructor()
    {
        super();
        this.role_transformer = new RoleTransformer();
    }

    public transform(user: IUserDomain): IUserTransformer
    {
        return {
            id: user.get_id(),
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            birthday: user.birthday,
            document_type: user.document_type,
            document_number: user.document_number,
            gender: user.gender,
            phone: user.phone,
            country: user.country,
            address: user.address,
            enable: user.enable,
            roles: this.role_transformer.handle(user.get_roles()),
            permissions: user.permissions,
            createdAt: moment(user.createdAt).utc().unix(),
            updatedAt: moment(user.updatedAt).utc().unix()
        };
    }
}

export default UserTransformer;
