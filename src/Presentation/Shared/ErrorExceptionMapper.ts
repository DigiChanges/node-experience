import StatusCode from "./StatusCode";

export class ErrorExceptionMapper
{
    static handle(err: any)
    {
        let exception: any = {
                statusCode: null,
                message: null,
                errors: null
        };

        if (err.hasOwnProperty('name') && err.name === "MongoError")
        {
            if (err.code === 11000)
            {
                exception.statusCode = StatusCode.HTTP_UNPROCESSABLE_ENTITY;
                exception.message = "Duplicate entity.";
            }
        }
        else
        {
            exception = err;
        }

        return exception;
    }
}