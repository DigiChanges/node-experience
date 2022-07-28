import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import IDecodeToken from '../../../Shared/InterfaceAdapters/IDecodeToken';

declare type Auth = IUserDomain | IDecodeToken;

export default Auth;
