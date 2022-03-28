import IDefaultMessageTransformer from '../../../InterfaceAdapters/IDefaultMessageTransformer';

class DataResponseMessage implements IDefaultMessageTransformer
{
    id: string;
    message: string;

    constructor(id: string, message: string)
    {
        this.id = id;
        this.message = message;
    }
}

export default DataResponseMessage;
