import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import ICreateConnection from "../InterfaceAdapters/IDatabase/ICreateConnection";
import initServer from "./initServer";

describe("Start Index Test", () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;

    beforeAll(async (done) => {
        const configServer = await initServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection =configServer.dbConnection;

        done();
    });

    afterAll((async (done) => {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe("#get", () => {
        test("should have a status code of 200", async (done) => {
            const response: any = await request.get("/");
            expect(response.statusCode).toBe(200);

            done();
        });
    });
});