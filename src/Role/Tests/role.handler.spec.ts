import { SuperAgentTest } from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { IListRolesResponse, IRoleResponse } from './types';
import MainConfig from '../../Config/mainConfig';

describe('Start Role Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let roleId = '';
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

    describe('Role Success', () =>
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

        test('Add Role without enable property /roles', async() =>
        {
            const payload: any = {
                name: 'Role1 Test',
                slug: 'role1test',
                permissions: []
            };

            const response: IRoleResponse = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(true);

            roleId = data.id;
        });

        test('Add Role with enable property /roles', async() =>
        {
            const payload: any = {
                name: 'Role2 Test',
                slug: 'role2test',
                permissions: [],
                enable: false
            };

            const response: IRoleResponse = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            roleId = data.id;
        });

        test('Add Role with permissions property /roles', async() =>
        {
            const payload: any = {
                name: 'Role3 Test',
                slug: 'role3test',
                permissions: ['itemsSave'],
                enable: true
            };

            const response: IRoleResponse = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            roleId = data.id;
        });

        test('Get Role /roles/:id', async() =>
        {
            const payload: any = {
                name: 'Role3 Test',
                slug: 'role3test',
                permissions: ['itemsSave'],
                enable: true
            };

            const response: IRoleResponse = await request
                .get(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);
        });

        test('Update Role /roles/:id', async() =>
        {
            const payload: any = {
                name: 'Role3 Test Update',
                slug: 'role3testupdate',
                permissions: ['itemsDelete'],
                enable: false
            };

            const response: IRoleResponse = await request
                .put(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);
        });

        test('Delete Role /roles/:id', async() =>
        {
            const payload: any = {
                name: 'Role4 Test',
                slug: 'role4test',
                permissions: ['itemsSave'],
                enable: true
            };

            const createResponse: IRoleResponse = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/roles/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);
        });

        test('Get Roles /roles', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListRolesResponse = await request
                .get('/api/roles?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(6);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(2);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(config.getConfig().url.urlApi);
            expect(pagination.firstUrl).toContain('/api/roles?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/roles?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/roles?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/roles?pagination[offset]=0&pagination[limit]=5');

        });

        test('Get Roles /roles without pagination', async() =>
        {

            const response: IListRolesResponse = await request
                .get('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(6);
            expect(pagination).not.toBeDefined();
        });

        test('Get Roles /roles with Filter Type', async() =>
        {

            const response: IListRolesResponse = await request
                .get('/api/roles?pagination[limit]=20&pagination[offset]=0&filter[slug]=admin')
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

        test('Get Roles /roles with Sort Desc Type', async() =>
        {
            const response: IListRolesResponse = await request
                .get('/api/roles?pagination[limit]=20&pagination[offset]=0&sort[slug]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data: [role1, role2] } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(role1.slug).toStrictEqual('role3testupdate');
            expect(role2.slug).toStrictEqual('role2test');
        });

        test('Sync roles permissions /sync-roles-permissions', async() =>
        {

            const response: any = await request
                .post('/api/auth/sync-roles-permissions')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.message).toStrictEqual('Sync Successfully');
        });
    });

    describe('Role Fails', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'superadmin@node.com',
                password: '12345678'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;

        });

        test('Add Role /roles', async() =>
        {
            const payload = {
                name: 'Role 2',
                type: 'Role 1'
            };

            const response: IRoleResponse = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('slug');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('slug must be a string');
        });

        test('Get Role /roles/:id', async() =>
        {

            const response: IRoleResponse = await request
                .get(`/api/roles/${roleId}dasdasda123`)
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

        test('Update Role /roles/:id', async() =>
        {
            const payload: any = {
                name: 150,
                slug: 'role3testupdate',
                enable: 'false'
            };

            const response: IRoleResponse = await request
                .put(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { status, statusCode, message, errors: [error1, error2] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error1.property).toStrictEqual('name');
            expect(error1.constraints.isString).toBeDefined();
            expect(error1.constraints.isString).toStrictEqual('name must be a string');

            expect(error2.property).toStrictEqual('permissions');
            expect(error2.constraints.isArray).toBeDefined();
            expect(error2.constraints.isArray).toStrictEqual('permissions must be an array');
        });

        test('Delete Role error /roles/:id', async() =>
        {
            const deleteErrorResponse: IRoleResponse = await request
                .delete(`/api/roles/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('Role not found.');
        });
    });
});
