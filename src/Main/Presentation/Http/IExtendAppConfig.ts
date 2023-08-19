import { IAppConfig } from '@digichanges/shared-experience';

type IExtendAppConfig = IAppConfig & { env: string, dbConfigDefault: string };

export default IExtendAppConfig;
