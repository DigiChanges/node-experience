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
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            gender: user.gender,
            phone: user.phone,
            country: user.country,
            address: user.address,
            enable: user.enable,
            roles: this.role_transformer.handle(user.getRoles()),
            permissions: user.permissions,
            createdAt: moment(user.createdAt).utc().unix(),
            updatedAt: moment(user.updatedAt).utc().unix()
        };
    }
}

export default UserTransformer;
