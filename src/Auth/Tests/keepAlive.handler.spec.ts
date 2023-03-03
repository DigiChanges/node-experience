import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Keep Alive Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: any = null;

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

    describe('Keep Alive Success', () =>
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

        test.skip('Keep Alive POST /', async() =>
        {
            const response: any = await request
                .post('/api/auth/keep-alive')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { metadata: { refreshToken } } } = response;

            expect(response.statusCode).toStrictEqual(201);

            token = refreshToken;
        });
    });
});

