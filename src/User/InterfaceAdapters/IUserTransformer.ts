import IRoleTransformer from '../../Role/InterfaceAdapters/IRoleTransformer';

interface IUserTransformer
{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: string;
    phone: string;
    country: string;
    address: string;
    roles: IRoleTransformer[];
    permissions: string[];
    enable: boolean;
    createdAt: number;
    updatedAt: number;
}

export default IUserTransformer;
