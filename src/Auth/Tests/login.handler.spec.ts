import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Login Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;

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

    test('Login User Success', async() =>
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

        expect(response.statusCode).toStrictEqual(201);

        expect(data.user.email).toStrictEqual('user@node.com');
        expect(data.user.firstName).toStrictEqual('user');
    });

    test('Login SuperAdmin Success', async() =>
    {
        const payload = {
            email: 'superadmin@node.com',
            password: '12345678'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { data } } = response;

        expect(response.statusCode).toStrictEqual(201);

        expect(data.user.email).toStrictEqual('superadmin@node.com');
        expect(data.user.firstName).toStrictEqual('Super');
    });

    test('Login User with Refresh Token', async() =>
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

        expect(response.statusCode).toStrictEqual(201);

        const loginCookie = response.header['set-cookie'];
        expect(loginCookie).toHaveLength(1);
        expect(loginCookie[0].split('=')[0]).toStrictEqual('refreshToken');
    });

    test('Login SuperAdmin Wrong Credentials', async() =>
    {
        const payload = {
            email: 'superadmin@node.com',
            password: '123456789'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { message } } = response;

        expect(response.statusCode).toStrictEqual(403);

        expect(message).toStrictEqual('Error credentials.');
    });

    test('Login Operator unverified', async() =>
    {
        const payload = {
            email: 'operator@disabled.com',
            password: '1234567901'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { message } } = response;

        expect(response.statusCode).toStrictEqual(403);

        expect(message).toStrictEqual('This user is not verified.');
    });

    test('Login Operator with Role Operator Enable False', async() =>
    {
        const payload = {
            email: 'operator@roleDisabled.com',
            password: '123456790'
        };

        const response: any = await request
            .post('/api/auth/login?provider=local')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { message } } = response;

        expect(response.statusCode).toStrictEqual(403);

        expect(message).toStrictEqual('Your role is disable.');
    });
});
