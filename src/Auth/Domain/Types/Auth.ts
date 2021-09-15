import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';

declare type Auth = IUserDomain | ITokenDecode;

export default Auth;
