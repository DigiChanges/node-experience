import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import Notificator from '../../Notification/Services/Notificator';

describe('Start ForgotPassword Test', () =>
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

        jest.spyOn(Notificator, 'send_email').mockImplementation(() => new Promise<boolean>((resolve) => resolve(true)));

        done();
    });

    afterAll((async(done) =>
    {
        await db_connection.drop();
        await db_connection.close();

        done();
    }));

    describe('ForgotPassword Success', () =>
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

        test('ForgotPassword POST /', async done =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: any = await request
                .post('/api/auth/forgotPassword')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(message).toStrictEqual('We\'ve sent you an email');

            done();
        });
    });
});

