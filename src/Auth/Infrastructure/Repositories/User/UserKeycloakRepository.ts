import axios from 'axios';
import qs from 'qs';
import IUserRepository from './IUserRepository';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import NotFoundException from '../../../../Shared/Exceptions/NotFoundException';
import UserFilter from '../../../Presentation/Criterias/UserFilter';
import User from '../../../Domain/Entities/User';
import ErrorHttpException from '../../../../Shared/Presentation/Shared/ErrorHttpException';
import KeycloakAxiosRepository from '../Auth/KeycloakAxiosRepository';
import UserAssignRolePayload from '../../../Domain/Payloads/User/UserAssignRolePayload';

class UserKeycloakRepository extends KeycloakAxiosRepository implements IUserRepository
{
    private readonly mainUrl: string;

    constructor()
    {
        super();
        this.mainUrl = `${this.host}/admin/realms/${this.mainRealm}/users`;
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'get',
            url: `${this.mainUrl}?username=${email}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            }
        };

        const users = (await axios(config)).data;
        const user = users.pop();

        if (!user)
        {
            throw new NotFoundException('User');
        }

        const payload = {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthdate: user.attributes.birthdate[0],
            genre: user.attributes.genre[0],
            phone: user.attributes.phone[0],
            country: user.attributes.country[0],
            verify: user.emailVerified,
            enable: user.enabled,
            roles: []
        };

        return new User(payload);
    }

    async updatePassword(id: string, password: string): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            credentials: [
                {
                    type: 'password',
                    value: password,
                    temporary: false
                }
            ]
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

        const response = (await axios(config));

        if (response?.data?.errorMessage || response?.data?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }

        return response;
    }

    async list(criteria: ICriteria): Promise<any>
    {
        const filter = criteria.getFilter();
        const queryString = {};

        if (filter.has(UserFilter.ENABLE))
        {
            const _enable = filter.get(UserFilter.ENABLE);
            queryString['enable'] = _enable !== 'false';
        }

        if (filter.has(UserFilter.EMAIL))
        {
            queryString['email'] = filter.get(UserFilter.EMAIL) as string;
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

        const users = (await axios(config)).data;

        if (users?.errorMessage || users?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }

        // return new MongoosePaginator(queryBuilder, criteria);
        return users.map(user =>
        {
            const payload = {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthdate: user.attributes.birthdate[0],
                genre: user.attributes.genre[0],
                phone: user.attributes.phone[0],
                country: user.attributes.country[0],
                verify: user.emailVerified,
                enable: user.enabled,
                roles: []
            };

            return new User(payload);
        });
    }

    async delete(id: string): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'delete',
            url: `${this.mainUrl}/${id}`,
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

        return response;
    }

    async getOne(id: string): Promise<IUserDomain>
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

        const user = (await axios(config)).data;

        if (!user)
        {
            throw new NotFoundException('User');
        }

        const payload = {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthdate: user.attributes.birthdate[0],
            genre: user.attributes.genre[0],
            phone: user.attributes.phone[0],
            country: user.attributes.country[0],
            verify: user.emailVerified,
            enable: user.enabled,
            roles: []
        };

        return new User(payload);
    }

    async save(element: IUserDomain, password: string): Promise<IUserDomain>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            username: element.email,
            email: element.email,
            firstName: element.firstName,
            lastName: element.lastName,
            enabled: true,
            attributes: {
                genre: [element.genre],
                country: [element.country],
                birthdate: [element.birthdate],
                phone: [element.phone]
            },
            credentials: [
                {
                    type: 'password',
                    value: password,
                    temporary: false
                }
            ]
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

    async update(element: IUserDomain): Promise<IUserDomain>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            username: element.email,
            email: element.email,
            firstName: element.firstName,
            lastName: element.lastName,
            enabled: element.enable,
            attributes: {
                genre: [element.genre],
                country: [element.country],
                birthdate: [element.birthdate],
                phone: [element.phone]
            }
        };

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.mainUrl}/${element.getId()}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data
        };

        const response = await axios(config);

        if (response?.data?.errorMessage || response?.data?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }

        return element;
    }

    async active(element: IUserDomain): Promise<any>
    {
        const loginRes = await this.loginAdmin();

        const data = {
            enabled: true
        };

        element.enable = true;

        const config = {
            ...this.config,
            method: 'put',
            url: `${this.mainUrl}/${element.getId()}`,
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

    async assignRoles(payload: UserAssignRolePayload): Promise<void>
    {
        const loginRes = await this.loginAdmin();

        const config = {
            ...this.config,
            method: 'post',
            url: `${this.mainUrl}/${payload.id}/role-mappings/clients/${this.clientUuid}`,
            headers: {
                'Authorization': `Bearer ${loginRes.access_token}`,
                'Content-Type': 'application/json'
            },
            data: payload.roles
        };

        const response = (await axios(config)).data;

        if (response?.errorMessage || response?.error)
        {
            throw new ErrorHttpException(); // TODO: Add custom exception
        }
    }
}

export default UserKeycloakRepository;
