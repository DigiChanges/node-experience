import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { LoggerRoutes } from './Middlewares/LoggerRoutes';
import { InversifyExpressServer } from "inversify-express-utils";
import Container from "./inversify.config";
import './Api/Handlers/ItemHandler';

class App {
    public port?: number;
    private server: InversifyExpressServer;

    constructor() {
        this.port = Number(process.env.SERVER_PORT); // default port to listen;
        this.server = new InversifyExpressServer(Container);
    }

    public listen() {
        this.server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(LoggerRoutes.log);
        });

        const serverInstance = this.server.build();
        serverInstance.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;