import {InversifyExpressServer} from 'inversify-express-utils';
import supertest from 'supertest';
import {ICreateConnection} from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('Start Index Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;

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

    describe('#get', () =>
    {
        test('should have a status code of 200', async(done) =>
        {
            const response: any = await request.get('/');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });
    });
});