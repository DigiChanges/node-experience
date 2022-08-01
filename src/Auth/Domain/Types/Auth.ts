import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import IDecodeToken from '../Models/IDecodeToken';

declare type Auth = IUserDomain | IDecodeToken;

export default Auth;
