import { ICreateConnection } from '@digichanges/shared-experience';
import { SuperAgentTest } from 'supertest';
import { mainConfig } from '../../Config/mainConfig';
import initTestServer from '../../initTestServer';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { IListUsersResponse, IUserResponse } from './types';

describe('Start User Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let userId = '';
    let deleteResponse: any = null;

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;

    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();

    }));

    describe('User Success', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;

        });

        test('Add User without enable property /users', async() =>
        {
            const payload: any = {
                firstName: 'Jhon',
                lastName: 'Doe',
                email: 'user2@node.com',
                birthday: '04/08/1991',
                documentType: 'dni',
                documentNumber: '35319112',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 123',
                password: '12345678',
                passwordConfirmation: '12345678',
                permissions: []
            };

            const response: IUserResponse = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(true);

            userId = data.id;

        });

        test('Add User with enable property /users', async() =>
        {
            const payload: any = {
                firstName: 'Jhon',
                lastName: 'Doe',
                email: 'user3@node.com',
                birthday: '04/08/1992',
                documentType: 'dni',
                documentNumber: '35319321',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 123',
                password: '12345678',
                passwordConfirmation: '12345678',
                enable: false,
                permissions: []
            };

            const response: IUserResponse = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(payload.enable);

            userId = data.id;

        });

        test('Get User /users/:id', async() =>
        {
            const payload: any = {
                firstName: 'Jhon',
                lastName: 'Doe',
                email: 'user3@node.com',
                password: '12345678',
                password_confirmation: '12345678',
                permissions: []
            };

            const response: IUserResponse = await request
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);

        });

        test('Update User /users/:id', async() =>
        {
            const payload: any = {
                firstName: 'Jhon Update',
                lastName: 'Doe Update',
                email: 'user2@update.com',
                birthday: '04/08/1991',
                documentType: 'dni',
                documentNumber: '35319131',
                gender: 'female',
                phone: '22344569121',
                country: 'UR',
                address: 'Norway 124',
                enable: false,
                permissions: []
            };

            const response: IUserResponse = await request
                .put(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.email).toStrictEqual(payload.email);
            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.lastName).toStrictEqual(payload.lastName);
            expect(data.enable).toStrictEqual(payload.enable);
            expect(data.birthday).toStrictEqual(payload.birthday);
            expect(data.documentType).toStrictEqual(payload.documentType);
            expect(data.documentNumber).toStrictEqual(payload.documentNumber);
            expect(data.gender).toStrictEqual(payload.gender);
            expect(data.phone).toStrictEqual(payload.phone);
            expect(data.country).toStrictEqual(payload.country);

        });

        test('Change my Password /users/change-my-password', async() =>
        {
            let payload: any = {
                currentPassword: '12345678',
                password: '123456789',
                passwordConfirmation: '123456789'
            };

            let response: any = await request
                .post('/api/users/change-my-password')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode } } = response;


            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            payload = {
                email: 'user@node.com',
                password: '123456789'
            };

            response = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            expect(response.statusCode).toStrictEqual(201);
            expect(response.body.status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(response.body.data.user.email).toStrictEqual('user@node.com');
            expect(response.body.data.user.firstName).toStrictEqual('user');

            token = response.body.data.token;

        });

        test('Delete User /users/:id', async() =>
        {
            const payload: any = {
                email: 'user2@delete.com',
                firstName: 'Jhon for delete',
                lastName: 'Doe Update',
                birthday: '04/08/1992',
                documentType: 'dni',
                documentNumber: '25319112',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 126',
                password: '12345678',
                enable: false,
                passwordConfirmation: '12345678',
                permissions: []
            };

            const createResponse: IUserResponse = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/users/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);

        });

        test('Get Users /users', async() =>
        {

            const response: IListUsersResponse = await request
                .get('/api/users?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(pagination.offset).toStrictEqual(0);
            expect(pagination.limit).toStrictEqual(5);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(2);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(mainConfig.url.urlApi);
            expect(pagination.firstUrl).toContain('/api/users?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/users?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/users?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/users?pagination[offset]=0&pagination[limit]=5');

        });

        test('Get Users /users without pagination', async() =>
        {

            const response: IListUsersResponse = await request
                .get('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(pagination).not.toBeDefined();

        });

        test('Get Users /users with Filter Type', async() =>
        {

            const response: IListUsersResponse = await request
                .get('/api/users?pagination[limit]=20&pagination[offset]=0&filter[email]=user2@node.com')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);


        });

        test('Get Users /users with Sort Desc Type', async() =>
        {

            const response: IListUsersResponse = await request
                .get('/api/users?pagination[limit]=20&pagination[offset]=0&sort[email]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data: [user1, user2] } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(user1.email).toStrictEqual('user@node.com');
            expect(user2.email).toStrictEqual('user2@update.com');

        });
    });

    describe('User Fails', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '123456789'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;

        });

        test('Add User /users', async() =>
        {
            const payload = {
                name: 'User 2',
                type: 'User 1'
            };

            const response: IUserResponse = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('firstName');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('firstName must be a string');

        });

        test('Get User /users/:id', async() =>
        {

            const response: IUserResponse = await request
                .get(`/api/users/${userId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('id');
            expect(error.constraints.isUuid).toBeDefined();
            expect(error.constraints.isUuid).toStrictEqual('id must be a UUID');

        });

        test('Update User /users/:id', async() =>
        {
            const payload = {
                email: 'aaaa1@update.com',
                firstName: 150,
                lastName: 'Doe 1',
                birthday: '04/07/1990',
                documentType: 'dni',
                documentNumber: '35319132',
                gender: 'male',
                phone: '22344569123',
                country: 'AR',
                address: 'Norway 120',
                enable: true
            };

            const response: IUserResponse = await request
                .put(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('firstName');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('firstName must be a string');

        });

        test('Delete User error /users/:id', async() =>
        {
            const deleteErrorResponse: IUserResponse = await request
                .delete(`/api/users/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('User not found.');

        });
    });
});

