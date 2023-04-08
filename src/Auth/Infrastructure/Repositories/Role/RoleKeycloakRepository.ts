import axios from 'axios';
import qs from 'qs';
import IRoleRepository from './IRoleRepository';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import NotFoundException from '../../../../Shared/Exceptions/NotFoundException';
import RoleFilter from '../../../Presentation/Criterias/RoleFilter';
import Role from '../../../Domain/Entities/Role';
import ErrorHttpException from '../../../../Shared/Presentation/Shared/ErrorHttpException';
import KeycloakAxiosRepository from '../Auth/KeycloakAxiosRepository';

class RoleKeycloakRepository extends KeycloakAxiosRepository implements IRoleRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/admin/realms/${this.mainRealm}/clients/${this.clientUuid}/roles`;
    }

    async list(criteria: ICriteria): Promise<any>
    {
        const filter = criteria.getFilter();
        const queryString = {};

        if (filter.has(RoleFilter.NAME))
        {
            queryString['name'] = filter.get(RoleFilter.NAME) as string;
        }

        const data = qs.stringify(queryString);

        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}?${data}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        const roles = (await axios(config)).data;

        return roles.map(role =>
        {
            return new Role({ _id: role.id, name: role.name, permissions: [] });
        });
        // ! todo create a KeycloakPaginator
    }

    async delete(name: string): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'delete',
            url: `${this.mainUrl}/${name}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = (await axios(config)).data;

        if (response?.errorMessage || response?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }
    }

    async getOne(id: string): Promise<IRoleDomain>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}/${id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        const role = (await axios(config)).data;

        if (!role)
        {
            throw new NotFoundException('Role');
        }

        const payload = {
            _id: role.sub,
            name: role.name,
            permissions: []
        };

        return new Role(payload);
    }

    async save(element: IRoleDomain): Promise<IRoleDomain>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            name: element.name
        };

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        const response = (await axios(config)).data;

        if (response?.errorMessage || response?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }

        element.setId(response.id);

        return element;
    }

    async update(element: IRoleDomain, id: string): Promise<IRoleDomain>
    {
        const loginRes = await this.login({ username: this.username, password: this.password, clientId: 'admin-cli' });

        const data = {
            name: element.name
        };

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.mainUrl}/${id}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        const response = (await axios(config)).data;

        if (response?.errorMessage || response?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }

        return element;
    }
}

export default RoleKeycloakRepository;
