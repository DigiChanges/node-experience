export class DataResponse
{
    private data: any;
    private status: any;
    private error: any;

    constructor()
    {
        this.error = {
            isFailed: false,
            message: ""
        };
    }

    getStatus(): any
    {
        return this.status;
    }
    setStatus(status: any)
    {
        this.status = status;
    }
    getData(): any
    {
        return this.data;
    }
    setData(data: any)
    {
        this.data = data;
    }
    getError(): boolean
    {
        return this.error;
    }
    setError(error: {isFailed: boolean, message: string})
    {
        this.error = error;
    }
}