import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';

declare type Auth = IUserDomain | ITokenDecode;

export default Auth;
