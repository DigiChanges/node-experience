import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import { IPermissionsResponse } from './types';

describe('Start Permission Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let db_connection: ICreateConnection;
    let token: any = null;

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

    describe('', () =>
    {
        beforeAll(async(done) =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: any = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;

            done();
        });

        test('Get Permissions', async(done) =>
        {

            const response: IPermissionsResponse = await request
                .get('/api/auth/permissions')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            const keep_alive = data.some(({ group, permissions }) => group === 'AUTH' && permissions.some((permission) => permission === 'authKeepAlive'));

            expect(keep_alive).toStrictEqual(true);

            done();
        });

        test('Resource Not found', async(done) =>
        {

            const response: any = await request
                .get('/api/auth/notfound')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { status, statusCode, message } } = response;

            expect(response.statusCode).toStrictEqual(404);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_NOT_FOUND');

            expect(message).toStrictEqual('Route not found.');

            done();
        });

        test('Not authorized', async(done) =>
        {

            const response: any = await request
                .get('/api/auth/permissions')
                .set('Accept', 'application/json')
                .send();

            const { body: { status, statusCode, message, metadata: { refreshToken } } } = response;

            expect(response.statusCode).toStrictEqual(403);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_FORBIDDEN');

            expect(message).toStrictEqual('You must be authenticated.');

            done();
        });
    });
});
