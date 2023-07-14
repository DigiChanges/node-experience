import { ErrorException } from '@digichanges/shared-experience';

type ValidationType = { parseAsync: (data: unknown) => Promise<unknown> };

class ValidatorSchema
{
    static async handle<T>(validation: ValidationType, data: T): Promise<unknown | T>
    {
        try
        {
            return await validation.parseAsync(data);
        }
        catch (e)
        {
            throw new ErrorException({ message: 'Request Failed.' }, 'ValidatorSchemaError', e);
        }
    }
}

export default ValidatorSchema;
