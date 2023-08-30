import { Transformer } from '@digichanges/shared-experience';
import RoleUserTransformer from './RoleUserTransformer';

class UserRoleTransformer extends Transformer
{
    private tr: RoleUserTransformer;

    constructor()
    {
        super();
        this.tr = new RoleUserTransformer();
    }

    public async transform(data: any): Promise<any>
    {
        return {
            id: data.user.getId(),
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            birthdate: data.user.birthdate,
            gender: data.user.gender,
            phone: data.user.phone,
            country: data.user.country,
            enable: data.user.enable,
            roles: await this.tr.handle(data.roles)
        };
    }
}

export default UserRoleTransformer;
