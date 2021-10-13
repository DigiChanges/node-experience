import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('Start Keep Alive Test', () =>
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

    describe('Keep Alive Success', () =>
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

        test.skip('Keep Alive POST /', async done =>
        {

            const response: any = await request
                .post('/api/auth/keepAlive')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, metadata: { refreshToken } } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            token = refreshToken;

            done();
        });
    });
});

