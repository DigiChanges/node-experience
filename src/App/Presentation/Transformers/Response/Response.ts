import IResponseTransformer from '../../../InterfaceAdapters/IResponseTransformer';

class Response implements IResponseTransformer
{
    id: string;
    message: string;

    constructor(id: string, message: string)
    {
        this.id = id;
        this.message = message;
    }
}

export default Response;
