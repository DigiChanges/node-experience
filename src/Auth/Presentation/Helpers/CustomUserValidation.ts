import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export function IsValidBirthday(validationOptions?: ValidationOptions)
{
    return (object: any, propertyName: string) =>
    {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsValidBirthdayConstraint
        });
    };
}

@ValidatorConstraint({ name: 'IsValidBirthday' })
class IsValidBirthdayConstraint implements ValidatorConstraintInterface
{
    public validate(date: string)
    {
        return date ? this.dateIsValid(date) : false;
    }

    private dateIsValid(dateStr: string)
    {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateStr.match(regex) === null)
        {
            return false;
        }

        const date = new Date(dateStr);

        const timestamp = date.getTime();

        if (typeof timestamp !== 'number' || Number.isNaN(timestamp))
        {
            return false;
        }

        return date.toISOString().startsWith(dateStr);
    }
}
