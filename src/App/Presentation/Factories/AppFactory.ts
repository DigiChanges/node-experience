import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';


class AppFactory
{
    private readonly app_name: string;

    constructor(app_name = 'AppExpress')
    {
        this.app_name = app_name;
    }

    create(): IApp
    {
        let app = null;

        if (this.app_name === 'AppExpress')
        {
            app = new AppExpress();
        }

        return app;
    }
}

export default AppFactory;
