import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('Start Login Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let db_connection: ICreateConnection;

    beforeAll(async(done) =>
    {
        const config_server = await initTestServer();

        server = config_server.server;
        request = config_server.request;
        db_connection = config_server.dbConnection;

        done();
    });

    afterAll((async(done) =>
    {
        await db_connection.drop();
        await db_connection.close();

        done();
    }));

    test('Login User Success', async(done) =>
    {
        const payload = {
            email: 'user@node.com',
            password: '12345678'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { status, statusCode, data } } = response;

        expect(response.statusCode).toStrictEqual(201);
        expect(status).toStrictEqual('success');
        expect(statusCode).toStrictEqual('HTTP_CREATED');

        expect(data.user.email).toStrictEqual('user@node.com');
        expect(data.user.first_name).toStrictEqual('user');

        done();
    });

    test('Login SuperAdmin Success', async(done) =>
    {
        const payload = {
            email: 'superadmin@node.com',
            password: '12345678'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { status, statusCode, data } } = response;

        expect(response.statusCode).toStrictEqual(201);
        expect(status).toStrictEqual('success');
        expect(statusCode).toStrictEqual('HTTP_CREATED');

        expect(data.user.email).toStrictEqual('superadmin@node.com');
        expect(data.user.first_name).toStrictEqual('Super');

        done();
    });

    test('Login SuperAdmin Wrong Credentials', async(done) =>
    {
        const payload = {
            email: 'superadmin@node.com',
            password: '123456789'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { status, statusCode, message } } = response;

        expect(response.statusCode).toStrictEqual(403);
        expect(status).toStrictEqual('error');
        expect(statusCode).toStrictEqual('HTTP_FORBIDDEN');

        expect(message).toStrictEqual('Error credentials.');

        done();
    });

    test('Login Operator Enable False', async(done) =>
    {
        const payload = {
            email: 'operator@disabled.com',
            password: '1234567901'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { status, statusCode, message } } = response;

        expect(response.statusCode).toStrictEqual(403);
        expect(status).toStrictEqual('error');
        expect(statusCode).toStrictEqual('HTTP_FORBIDDEN');

        expect(message).toStrictEqual('Your user is disable.');

        done();
    });

    test('Login Operator with Role Operator Enable False', async(done) =>
    {
        const payload = {
            email: 'operator@roleDisabled.com',
            password: '123456790'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { status, statusCode, message } } = response;

        expect(response.statusCode).toStrictEqual(403);
        expect(status).toStrictEqual('error');
        expect(statusCode).toStrictEqual('HTTP_FORBIDDEN');

        expect(message).toStrictEqual('Your role is disable.');

        done();
    });
});
