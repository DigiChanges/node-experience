import { IAppConfig } from '@digichanges/shared-experience';

type IExtendAppConfig = IAppConfig & {
    env: string,
    cors: string
};

export default IExtendAppConfig;
