import IRoleTransformer from '../../Role/InterfaceAdapters/IRoleTransformer';

interface IUserTransformer
{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    document_type: string;
    document_number: string;
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
