import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';
import EmailStrategy from '../../Notification/Shared/EmailStrategy';

describe('Start Signup Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
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

    test('Signup Success', async() =>
    {
        const payload = {
            firstName: 'Jhon',
            lastName: 'Doe',
            email: 'john-doe@mail.com',
            password: '12345678',
            passwordConfirmation: '12345678',
            birthday: '1990-11-26',
            documentType: 'dni',
            documentNumber: '52261090712',
            gender: 'M',
            phone: '2234456998',
            country: 'AR',
            address: 'Don Trusted 123',
            permissions: []
        };

        const response: any = await request
            .post('/api/auth/signup')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { data } } = response;

        expect(response.statusCode).toStrictEqual(201);
        expect(data.messageCode).toStrictEqual('auth.domain.messages.register');
    });

    test('Signup Fail', async() =>
    {
        const payload = {
            lastName: 'Doe',
            email: 'john-doe@mail.com',
            password: '12345678',
            passwordConfirmation: '12345678',
            birthday: '1990-11-26',
            documentType: 'dni',
            documentNumber: '52261090712',
            gender: 'M',
            phone: '2234456998',
            country: 'AR',
            address: 'Don Trusted 123',
            permissions: []
        };

        const response: any = await request
            .post('/api/auth/signup')
            .set('Accept', 'application/json')
            .send(payload);

        const { body: { errors: [error1] } } = response;

        expect(response.statusCode).toStrictEqual(422);
        expect(error1.code).toStrictEqual('invalid_type');
        expect(error1.path[0]).toStrictEqual('firstName');
        expect(error1.message).toStrictEqual('Required');
    });
});
