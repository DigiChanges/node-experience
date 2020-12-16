import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import ICreateConnection from "../../../InterfaceAdapters/IDatabase/ICreateConnection";
import initServer from "../../initServer";

describe("Start Keep Alive Test", () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;

    beforeAll(async (done) => {
        const configServer = await initServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection = configServer.dbConnection;

        done();
    });

    afterAll((async (done) => {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe('Keep Alive Success', () =>
    {
        let token: any = null;

        beforeAll(async (done) => {
           const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {data}} = response;

            token = data.token;

            done();
        });

        test('Keep Alive POST /', async done => {

            const response: any = await request
                .post('/api/auth/keepAlive')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const {body: {status, statusCode}} = response;

            expect(response.statusCode).toBe(201);
            expect(status).toBe('success');
            expect(statusCode).toBe('HTTP_CREATED');

            done();
        });
    });
});

