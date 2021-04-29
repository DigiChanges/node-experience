import {InversifyExpressServer} from 'inversify-express-utils';
import supertest from 'supertest';
import {ICreateConnection} from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';
import Notificator from '../../App/Infrastructure/Notifications/Notificator';

describe('Start ForgotPassword Test', () =>
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

        jest.spyOn(Notificator, 'sendEmail').mockImplementation(() => new Promise<boolean>((resolve) => resolve(true)));

        done();
    });

    afterAll((async(done) =>
    {
        await dbConnection.drop();
        await dbConnection.close();

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

            const {body: {data}} = response;

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

