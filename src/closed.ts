import { createTerminus } from '@godaddy/terminus';

import ICacheRepository from './Shared/Infrastructure/Repositories/ICacheRepository';
import Logger from './Shared/Helpers/Logger';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import { EventHandler } from '@digichanges/shared-experience';
import { Server } from 'http';

const closedApplication = (server: Server, cache: ICacheRepository, createConnection: ICreateConnection, eventHandler: EventHandler) =>
{
    function onSignal()
    {
        void Logger.info('server is starting cleanup');
        cache.close();
        return Promise.all([
            createConnection.close(true),
            eventHandler.removeListeners()
        ]);
    }

    function onShutdown()
    {
        void Logger.info('cleanup finished, server is shutting down');
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
