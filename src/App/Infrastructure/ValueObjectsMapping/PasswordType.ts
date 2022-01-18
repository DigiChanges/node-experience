import { Type, Platform, EntityProperty, ValidationError } from '@mikro-orm/core';
import Password from '../../Domain/ValueObjects/Password';

class PasswordType extends Type<Password, string>
{
    convertToDatabaseValue(value: Password | undefined, platform: Platform): string
    {
        if (!value)
        {
            return value.toString();
        }

        throw ValidationError.invalidType(PasswordType, value, 'JS');
    }

    convertToJSValue(value: string  | undefined, platform: Platform): Password
    {
        if (value)
        {
            return new Password(value);
        }

        throw ValidationError.invalidType(PasswordType, value, 'JS');
    }

    getColumnType(prop: EntityProperty, platform: Platform)
    {
        return 'varchar(255)';
    }
}

export default PasswordType;
