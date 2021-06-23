import {InversifyExpressServer} from 'inversify-express-utils';
import supertest from 'supertest';
import {ICreateConnection} from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import {IPermissionsResponse} from './types';

describe('Start Permission Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;
    let token: any = null;

    beforeAll(async(done) =>
    {
        const configServer = await initTestServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection = configServer.dbConnection;

        done();
    });

    afterAll((async(done) =>
    {
        await dbConnection.drop();
        await dbConnection.close();

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

            const {body: {data}} = response;

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

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            const keepAlive = data.some(({group, permissions}) => group === 'AUTH' && permissions.some((permission) => permission === 'authKeepAlive'));

            expect(keepAlive).toStrictEqual(true);

            done();
        });

        test('Resource Not found', async(done) =>
        {

            const response: any = await request
                .get('/api/auth/notfound')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send();

            const {body: {status, statusCode, message}} = response;

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

            const {body: {status, statusCode, message, metadata: {refreshToken}}} = response;

            expect(response.statusCode).toStrictEqual(403);
            expect(status).toStrictEqual('error');
            expect(statusCode).toStrictEqual('HTTP_FORBIDDEN');

            expect(message).toStrictEqual('You must be authenticated.');

            done();
        });
    });
});
