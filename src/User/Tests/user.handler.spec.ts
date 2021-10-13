import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import { InversifyExpressServer } from 'inversify-express-utils';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { IListUsersResponse, IUserResponse } from './types';
import Config from 'config';

describe('Start User Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let user_id = '';
    let delete_response: any = null;

    beforeAll(async(done) =>
    {
        const config_server = await initTestServer();

        server = config_server.server;
        request = config_server.request;
        dbConnection = config_server.dbConnection;

        done();
    });

    afterAll((async(done) =>
    {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe('User Success', () =>
    {
        beforeAll(async(done) =>
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

            done();
        });

        test('Add User without enable property /users', async done =>
        {
            const payload: any = {
                first_name: 'Jhon',
                last_name: 'Doe',
                email: 'user2@node.com',
                birthday: '04/08/1991',
                document_type: 'dni',
                document_number: '35319112',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 123',
                password: '12345678',
                password_confirmation: '12345678',
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

            expect(data.first_name).toStrictEqual(payload.first_name);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(true);

            user_id = data.id;

            done();
        });

        test('Add User with enable property /users', async done =>
        {
            const payload: any = {
                first_name: 'Jhon',
                last_name: 'Doe',
                email: 'user3@node.com',
                birthday: '04/08/1992',
                document_type: 'dni',
                document_number: '35319321',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 123',
                password: '12345678',
                password_confirmation: '12345678',
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

            expect(data.first_name).toStrictEqual(payload.first_name);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(payload.enable);

            user_id = data.id;

            done();
        });

        test('Get User /users/:id', async done =>
        {
            const payload: any = {
                first_name: 'Jhon',
                last_name: 'Doe',
                email: 'user3@node.com',
                password: '12345678',
                password_confirmation: '12345678',
                permissions: []
            };

            const response: IUserResponse = await request
                .get(`/api/users/${user_id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.first_name).toStrictEqual(payload.first_name);
            expect(data.email).toStrictEqual(payload.email);

            done();
        });

        test('Update User /users/:id', async done =>
        {
            const payload: any = {
                first_name: 'Jhon Update',
                last_name: 'Doe Update',
                email: 'user2@update.com',
                birthday: '04/08/1991',
                document_type: 'dni',
                document_number: '35319131',
                gender: 'female',
                phone: '22344569121',
                country: 'UR',
                address: 'Norway 124',
                enable: false,
                permissions: []
            };

            const response: IUserResponse = await request
                .put(`/api/users/${user_id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);


            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.email).toStrictEqual(payload.email);
            expect(data.first_name).toStrictEqual(payload.first_name);
            expect(data.last_name).toStrictEqual(payload.last_name);
            expect(data.enable).toStrictEqual(payload.enable);
            expect(data.birthday).toStrictEqual(payload.birthday);
            expect(data.document_type).toStrictEqual(payload.document_type);
            expect(data.document_number).toStrictEqual(payload.document_number);
            expect(data.gender).toStrictEqual(payload.gender);
            expect(data.phone).toStrictEqual(payload.phone);
            expect(data.country).toStrictEqual(payload.country);

            done();
        });

        test('Change my Password /users/change-my-password', async done =>
        {
            let payload: any = {
                current_password: '12345678',
                password: '123456789',
                password_confirmation: '123456789'
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
            expect(response.body.data.user.first_name).toStrictEqual('user');

            token = response.body.data.token;

            done();
        });

        test('Delete User /users/:id', async done =>
        {
            const payload: any = {
                email: 'user2@delete.com',
                first_name: 'Jhon for delete',
                last_name: 'Doe Update',
                birthday: '04/08/1992',
                document_type: 'dni',
                document_number: '25319112',
                gender: 'male',
                phone: '2234456999',
                country: 'AR',
                address: 'Norway 126',
                password: '12345678',
                enable: false,
                password_confirmation: '12345678',
                permissions: []
            };

            const createResponse: IUserResponse = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            token = createResponse.body.metadata.refreshToken;

            delete_response = await request
                .delete(`/api/users/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = delete_response;

            expect(delete_response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.first_name).toStrictEqual(payload.first_name);
            expect(data.email).toStrictEqual(payload.email);

            done();
        });

        test('Get Users /users', async done =>
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
            expect(pagination.path).toContain(Config.get('url.urlApi'));
            expect(pagination.firstUrl).toContain('/api/users?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/users?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/users?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/users?pagination[offset]=0&pagination[limit]=5');

            done();
        });

        test('Get Users /users without pagination', async done =>
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

            done();
        });

        test('Get Users /users with Filter Type', async done =>
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


            done();
        });

        test('Get Users /users with Sort Desc Type', async done =>
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

            done();
        });
    });

    describe('User Fails', () =>
    {
        beforeAll(async(done) =>
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

            done();
        });

        test('Add User /users', async done =>
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

            expect(error.property).toStrictEqual('first_name');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('first_name must be a string');

            done();
        });

        test('Get User /users/:id', async done =>
        {

            const response: IUserResponse = await request
                .get(`/api/users/${user_id}dasdasda123`)
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

            done();
        });

        test('Update User /users/:id', async done =>
        {
            const payload = {
                email: 'aaaa1@update.com',
                first_name: 150,
                last_name: 'Doe 1',
                birthday: '04/07/1990',
                document_type: 'dni',
                document_number: '35319132',
                gender: 'male',
                phone: '22344569123',
                country: 'AR',
                address: 'Norway 120',
                enable: true
            };

            const response: IUserResponse = await request
                .put(`/api/users/${user_id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('first_name');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('first_name must be a string');

            done();
        });

        test('Delete User error /users/:id', async done =>
        {

            const deleteErrorResponse: IUserResponse = await request
                .delete(`/api/users/${delete_response.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('User not found.');

            done();
        });
    });
});

