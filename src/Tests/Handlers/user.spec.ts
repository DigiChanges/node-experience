import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import {ICreateConnection} from "@digichanges/shared-experience";
import initServer from "../initServer";

describe("Start User Test", () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;
    let token: any = null;
    let userId: string = '';
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

    describe('User Success', () =>
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

        test('Add User without enable property /users', async done => {
            const payload: any = {
                firstName: "Jhon",
                lastName: "Doe",
                email: "user2@node.com",
                password: "12345678",
                passwordConfirmation: "12345678",
                permissions: []
            };

            const response: any = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(true);

            userId = data.id;

            done();
        });

        test('Add User with enable property /users', async done => {
            const payload: any = {
                firstName: "Jhon",
                lastName: "Doe",
                email: "user3@node.com",
                password: "12345678",
                passwordConfirmation: "12345678",
                enable: false,
                permissions: []
            };

            const response: any = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(payload.enable);

            userId = data.id;

            done();
        });

        test('Get User /users/:id', async done => {

            const payload: any = {
                firstName: "Jhon",
                lastName: "Doe",
                email: "user3@node.com",
                password: "12345678",
                passwordConfirmation: "12345678",
                permissions: []
            };

            const response: any = await request
                .get(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);


            done();
        });

        test('Update User /users/:id', async done => {
            const payload: any = {
                firstName: "Jhon Update",
                lastName: "Doe Update",
                email: "user2@update.com",
                enable: false,
                permissions: []
            };

            const response: any = await request
                .put(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);
            expect(data.enable).toStrictEqual(payload.enable);


            done();
        });

        test('Change my Password /users/changeMyPassword', async done => {
            let payload: any = {
                currentPassword: "12345678",
                newPassword: "123456789",
                newPasswordConfirmation: "123456789"
            };

            let response: any = await request
                .post('/api/users/changeMyPassword')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            let {body: {status, statusCode}} = response;


            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

           payload = {
                email: "user@node.com",
                password: "123456789"
            };

            response = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            expect(response.statusCode).toStrictEqual(201);
            expect(response.body.status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(response.body.data.user.email).toStrictEqual("user@node.com");
            expect(response.body.data.user.firstName).toStrictEqual("user");

            token = response.body.data.token;

            done();
        });

        test('Delete User /users/:id', async done => {
            const payload: any = {
                firstName: "Jhon for delete",
                lastName: "Doe Update",
                email: "user2@delete.com",
                password: "12345678",
                enable: false,
                passwordConfirmation: "12345678",
                permissions: []
            };

            const createResponse: any = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            token = createResponse.body.metadata.refreshToken;

            deleteResponse = await request
                .delete(`/api/users/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data}} = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.firstName).toStrictEqual(payload.firstName);
            expect(data.email).toStrictEqual(payload.email);


            done();
        });

        test('Get Users /users', async done => {

            const response: any = await request
                .get('/api/users?pagination[limit]=5&pagination[offset]=0')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(5);
            expect(pagination.currentUrl).toContain('/api/users?pagination[limit]=5&pagination[offset]=0');
            expect(pagination.nextUrl).toContain('/api/users?pagination[limit]=5&pagination[offset]=5');


            done();
        });

        test('Get Users /users without pagination', async done => {

            const response: any = await request
                .get('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(6);
            expect(pagination).not.toBeDefined();


            done();
        });

        test('Get Users /users with Filter Type', async done => {

            const response: any = await request
                .get('/api/users?pagination[limit]=20&pagination[offset]=0&filter[email]=user2@node.com')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data, pagination}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);


            done();
        });

        test('Get Users /users with Sort Desc Type', async done => {

            const response: any = await request
                .get('/api/users?pagination[limit]=20&pagination[offset]=0&sort[email]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, data: [user1, user2]}} = response;

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
        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "123456789"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data}} = response;

            token = data.token;

            done();
        });

        test('Add User /users', async done => {
           const payload = {
                name: 'User 2',
                type: 'User 1'
            };

            const response: any = await request
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [error]}} = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('firstName');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('firstName must be a string');


            done();
        });

        test('Get User /users/:id', async done => {

            const response: any = await request
                .get(`/api/users/${userId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message, errors: [error]}} = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('id');
            expect(error.constraints.isUuid).toBeDefined();
            expect(error.constraints.isUuid).toStrictEqual('id must be an UUID');


            done();
        });

        test('Update User /users/:id', async done => {
            const payload = {
                email: "aaaa1@update.com",
                firstName: 150,
                lastName: "Doe 1",
                enable: true
            };

            const response: any = await request
                .put(`/api/users/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const {body: {status, statusCode, message, errors: [error]}} = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('firstName');
            expect(error.constraints.isString).toBeDefined();
            expect(error.constraints.isString).toStrictEqual('firstName must be a string');


            done();
        });

        test('Delete User error /users/:id', async done => {

            const deleteErrorResponse: any = await request
                .delete(`/api/users/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode, message}} = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
            expect(message).toStrictEqual('User Not Found');


            done();
        });
    });
});

