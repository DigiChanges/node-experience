import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import EmailStrategy from '../../Notification/Shared/EmailStrategy';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start ForgotPassword Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: any = null;
    let spy;

    beforeAll(async() =>
    {
        spy = jest.spyOn(EmailStrategy.prototype, 'send').mockImplementation(async() => new Promise<boolean>((resolve) => resolve(true)));

        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
        spy.mockRestore();
    }));

    describe('ForgotPassword Success', () =>
    {
        beforeAll(async() =>
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
        });

        test('ForgotPassword POST /', async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: any = await request
                .post('/api/auth/forgot-password')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.message).toStrictEqual('We\'ve sent you an email.');
        });
    });
});
