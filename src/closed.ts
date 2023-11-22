import { createTerminus } from '@godaddy/terminus';

import ICacheDataAccess from './Main/Infrastructure/Repositories/ICacheDataAccess';
import Logger from './Shared/Helpers/Logger';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import { EventHandler } from '@digichanges/shared-experience';
import { Server } from 'http';

const closedApplication = (server: Server, cache: ICacheDataAccess, createConnection: ICreateConnection, eventHandler: EventHandler) =>
{
    function onSignal()
    {
        Logger.info('server is starting cleanup');
        cache.close();
        return Promise.all([
            createConnection.close(true),
            eventHandler.removeListeners()
        ]);
    }

    function onShutdown()
    {
        Logger.info('cleanup finished, server is shutting down');
        cache.close();
        return Promise.all([
            createConnection.close(true),
            eventHandler.removeListeners()
        ]);
    }

    const options = {
        timeout: 1000,
        onSignal,
        onShutdown
    };

    createTerminus(server, options);
};

export default closedApplication;
