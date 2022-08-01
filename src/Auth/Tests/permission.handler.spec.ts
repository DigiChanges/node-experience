import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IPermissionsResponse } from './types';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Permission Test', () =>
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

    describe('', () =>
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

        test('Get Permissions', async() =>
        {
            const response: IPermissionsResponse = await request
                .get('/api/auth/permissions')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);

            const keepAlive = data.some(({ group, permissions }) => group === 'USERS' && permissions.some((permission) => permission === 'usersSave'));

            expect(keepAlive).toStrictEqual(true);
        });

        test('Resource Not found', async() =>
        {
            const response: any = await request
                .get('/api/auth/notfound')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { message } } = response;

            expect(response.statusCode).toStrictEqual(404);
            expect(message).toStrictEqual('Route not found.');
        });

        test('Not authorized', async() =>
        {
            const response: any = await request
                .get('/api/auth/permissions')
                .set('Accept', 'application/json')
                .send();

            const { body: { message } } = response;

            expect(response.statusCode).toStrictEqual(403);

            expect(message).toStrictEqual('Invalid token.');
        });
    });
});
