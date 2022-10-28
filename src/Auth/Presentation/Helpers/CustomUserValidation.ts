import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsValidBirthday implements ValidatorConstraintInterface
{
    public validate(date: string)
    {
        return this.dateIsValid(date);
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
