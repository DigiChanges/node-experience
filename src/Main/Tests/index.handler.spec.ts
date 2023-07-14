import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Index Test', () =>
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

    describe('#get', () =>
    {
        test('should have a status code of 200', async() =>
        {
            const response: any = await request.get('/');
            expect(response.statusCode).toStrictEqual(200);
        });
    });
});
