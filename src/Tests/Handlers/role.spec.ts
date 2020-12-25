import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import initServer from "../initServer";

describe("Start Role Test", () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;
    let token: any = null;
    let roleId: string = '';
    let deleteResponse: any = null;

    beforeAll(async (done) => {
        const configServer = await initServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection = configServer.dbConnection;

        done();
    });

    afterAll((async (done) => {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe('Role Success', () =>
    {
        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data}} = response;

            token = data.token;

            done();
        });

        test('Add Role without enable property /roles', async done => {
            const payload: any = {
                name: 'Role1 Test',
                slug: 'role1test',
                permissions: []
            };

            const response: any = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(true);

            roleId = data.id;
            token = refreshToken;

            done();
        });

        test('Add Role with enable property /roles', async done => {
            const payload: any = {
                name: 'Role2 Test',
                slug: 'role2test',
                permissions: [],
                enable: false,
            };

            const response: any = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            roleId = data.id;
            token = refreshToken;

            done();
        });

        test('Add Role with permissions property /roles', async done => {
            const payload: any = {
                name: 'Role3 Test',
                slug: 'role3test',
                permissions: ['itemsSave'],
                enable: true,
            };

            const response: any = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            roleId = data.id;
            token = refreshToken;

            done();
        });

        test('Get Role /roles/:id', async done => {

            const payload: any = {
                name: 'Role3 Test',
                slug: 'role3test',
                permissions: ['itemsSave'],
                enable: true,
            };

            const response: any = await request
                .get(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            token = refreshToken;

            done();
        });

        test('Update Role /roles/:id', async done => {
            const payload: any = {
                name: 'Role3 Test Update',
                slug: 'role3testupdate',
                permissions: ['itemsDelete'],
                enable: false,
            };

            const response: any = await request
                .put(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            token = refreshToken;

            done();
        });

        test('Delete Role /roles/:id', async done => {
            const payload: any = {
                name: 'Role4 Test',
                slug: 'role4test',
                permissions: ['itemsSave'],
                enable: true,
            };

            const createResponse: any = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            token = createResponse.body.metadata.refreshToken;

            deleteResponse = await request
                .delete(`/api/roles/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken}}} = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.name).toStrictEqual(payload.name);
            expect(data.slug).toStrictEqual(payload.slug);
            expect(data.permissions).toStrictEqual(payload.permissions);
            expect(data.enable).toStrictEqual(payload.enable);

            token = refreshToken;

            done();
        });

        test('Get Roles /roles', async done => {

            const response: any = await request
                .get('/api/roles?pagination[limit]=5&pagination[offset]=0')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken}, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toEqual(5);
            expect(pagination.total).toEqual(5);
            expect(pagination.currentUrl).toContain('/api/roles?pagination[limit]=5&pagination[offset]=0');
            expect(pagination.nextUrl).toContain('/api/roles?pagination[limit]=5&pagination[offset]=5');

            token = refreshToken;

            done();
        });

        test('Get Roles /roles without pagination', async done => {

            const response: any = await request
                .get('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken}, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(6);
            expect(pagination).not.toBeDefined();

            token = refreshToken;

            done();
        });

        test('Get Roles /roles with Filter Type', async done => {

            const response: any = await request
                .get('/api/roles?pagination[limit]=20&pagination[offset]=0&filter[slug]=admin')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, metadata: {refreshToken}, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            token = refreshToken;

            done();
        });

        test('Get Roles /roles with Sort Desc Type', async done => {

            const response: any = await request
                .get('/api/roles?pagination[limit]=20&pagination[offset]=0&sort[slug]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data: [role1, role2], metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(role1.slug).toStrictEqual('role3testupdate');
            expect(role2.slug).toStrictEqual('role2test');

            token = refreshToken;

            done();
        });

        test('Sync roles permissions /syncRolesPermissions', async done => {

            const response: any = await request
                .post('/api/auth/syncRolesPermissions')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {message, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(message).toStrictEqual('Sync Successfully');

            token = refreshToken;

            done();
        });
    });

    describe('Role Fails', () =>
    {
        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data}} = response;

            token = data.token;

            done();
        });

        test('Add Role /roles', async done => {
           const payload = {
                name: 'Role 2',
                type: 'Role 1'
            };

            const response: any = await request
                .post('/api/roles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [error], metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('slug');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('slug must be a string');

            token = refreshToken;

            done();
        });

        test('Get Role /roles/:id', async done => {

            const response: any = await request
                .get(`/api/roles/${roleId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message, errors: [error], metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('id');
            expect(error.constraints.isUuid).toBeDefined();
            expect(error.constraints.isUuid).toStrictEqual('id must be an UUID');

            token = refreshToken;

            done();
        });

        test('Update Role /roles/:id', async done => {
            const payload: any = {
                name: 150,
                slug: 'role3testupdate',
                enable: 'false',
            };

            const response: any = await request
                .put(`/api/roles/${roleId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [error1, error2], metadata: {refreshToken}}} = response;

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

            token = refreshToken;

            done();
        });

        test('Delete Role error /roles/:id', async done => {

            const deleteErrorResponse: any = await request
                .delete(`/api/roles/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message, metadata: {refreshToken}}} = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('Role Not Found');

            token = refreshToken;

            done();
        });
    });
});

