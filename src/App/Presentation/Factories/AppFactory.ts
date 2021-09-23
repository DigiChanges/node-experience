import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';


class AppFactory
{
    private readonly appName: string;

    constructor(appName = 'AppExpress')
    {
        this.appName = appName;
    }

    create(): IApp
    {
        let app = null;

        if (this.appName === 'AppExpress')
        {
            app = new AppExpress();
        }

        return app;
    }
}

export default AppFactory;
